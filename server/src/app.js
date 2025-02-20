const express = require("express");
const cors = require("cors");
const logger = require("./config/logger");
const listRoutes = require("./routes/lists");
const listItemsRoutes = require("./routes/list_items");
const templateRoutes = require("./routes/templates");



const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger);

// Routes
app.use("/api/lists", listRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api", listItemsRoutes);

app.get("/", (req, res) => {
  res.send("Express server is running!");
});

module.exports = app;
