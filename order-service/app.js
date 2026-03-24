const express = require("express");
const app = express();

app.get("/orders", (req, res) => {
  res.json([
    { id: 101, item: "Laptop" },
    { id: 102, item: "Phone" }
  ]);
});

app.listen(3002, () => {
  console.log("Order service running on 3002");
});