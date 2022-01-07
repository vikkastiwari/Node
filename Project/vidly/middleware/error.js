// catch block error handler

const logger = require("../middleware/logger");

module.exports = function (err, req, res, next) {
  // we log the exception as well
  //   winston.log("error", err.message);
  //  or directly we can pass helper function
  logger.error(err.message, err); // err passed as metadata
  /*error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6*/

  // error handler
  res.status(500).send("Something failed.");
};
