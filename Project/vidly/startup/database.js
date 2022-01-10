const mongoose = require("mongoose");
const logger = require("../middleware/logger");
const config = require("config");

module.exports = function () {
  // database connectivity
  const db = config.get("db");
  mongoose.connect(db).then(() => logger.info(`Connected to ${db}...`));
  // we dont add catch generally here coz when it is not handled we get exception and process terminates.
  // we dont want it up and running where we cant do anything with it
  // .catch((err) => console.error("Could not connect to MongoDB..."));
};
