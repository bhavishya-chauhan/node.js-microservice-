const express = require("express");
const axios = require("axios");
const app = express();

// Route to user service
app.get("/users", async (req, res) => {
  const response = await axios.get("http://user-service:3001/users");
  res.json(response.data);
});

// Route to order service
app.get("/orders", async (req, res) => {
  const response = await axios.get("http://order-service:3002/orders");
  res.json(response.data);
});

//health check
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(3000, () => {
  console.log("Gateway running on 3000");
});

const client = require("prom-client");

// default metrics (CPU, memory, etc.)
client.collectDefaultMetrics();

// request counter
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
});

// middleware
app.use((req, res, next) => {
  httpRequestCounter.inc();
  next();
});

// metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});