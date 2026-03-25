const express = require("express");
const app = express();

app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
  ]);
});

app.listen(3001, () => {
  console.log("User service running on 3001");
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