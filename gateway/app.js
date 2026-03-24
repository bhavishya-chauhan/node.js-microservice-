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