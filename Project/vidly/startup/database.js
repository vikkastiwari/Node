const mongoose = require("mongoose");
const logger = require("../middleware/logger");

module.exports = function () {
  // database connectivity
  mongoose
    .connect("mongodb://localhost/vidly")
    .then(() => logger.info("Connected to MongoDB..."));
  // .catch((err) => console.error("Could not connect to MongoDB..."));
};
