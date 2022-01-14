const express = require("express");
const app = express();
const logger = require("./middleware/logger");

// passing reference of app as parameter rather than initializing again and again
require("./startup/logging")(); // put this first always
require("./startup/routes")(app);
require("./startup/database")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app); // we can load this file conditionally in production if we want

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  logger.info(`Listening on port ${port}...`)
);
module.exports = server;
