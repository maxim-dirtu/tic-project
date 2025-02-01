const morgan = require("morgan");

const logger = morgan("dev"); // Logs requests to the console

module.exports = logger;
