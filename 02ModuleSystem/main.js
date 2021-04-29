const Logger = require("./logger");
const logger = new Logger();

// register event
logger.on("messageLogged", (arg) => {
  console.log("Logged - From Listener", arg);
});

logger.log("message");

// part-1
// var url = "http://mylogger.io/log";

// const log = (message) => {
//   console.log(message);
// };

// // it exports the object
// // module.exports.logges = log;

// // it exports the function
// module.exports = log;
