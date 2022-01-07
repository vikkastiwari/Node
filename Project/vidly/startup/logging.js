const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
const logger = require("../middleware/logger");

module.exports = function () {
  // custom handler
  // process.on("uncaughtException", (ex) => {
  //   console.log("uncaught Exception");
  //   logger.error(ex.message, ex);
  //   process.exit(1);
  // });

  // inbuilt exception handler
  // only handles uncaught exceptions means synchronous code
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  // throw new Error("Something failed during startup");

  process.on("unhandledRejection", (ex) => {
    console.log("We got unhandled Rejection");
    logger.error(ex.message, ex);
    process.exit(1);
  });

  // dummy async error
  // const p = Promise.reject(new Error("Something unwanted happened :("));
  // p.then(() => {
  //   console.log("Done");
  // });

  // mongodb logger
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27017/vidly",
    })
  );
};
