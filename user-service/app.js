const express = require("express");
const client = require("prom-client");

const app = express();

// default metrics
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

// routes
app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
  ]);
});

// metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// start server LAST
app.listen(3001, () => {
  console.log("User service running on 3001");
});