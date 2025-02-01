const express = require("express");
const cors = require("cors");
const logger = require("./config/logger");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger);

app.get("/", (req, res) => {
  res.send("Express server is running!");
});

module.exports = app;
