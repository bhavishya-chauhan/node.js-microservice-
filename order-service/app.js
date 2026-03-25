const express = require("express");
const app = express();
const client = require("prom-client");

app.get("/orders", (req, res) => {
  res.json([
    { id: 101, item: "Laptop" },
    { id: 102, item: "Phone" }
  ]);
});

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

app.listen(3002, () => {
  console.log("Order service running on 3002");
});

