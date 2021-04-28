const EventEmitter = require("events");

var url = "http://mylogger.io/log";

class Logger extends EventEmitter {
  log = (message) => {
    console.log("Logging", message);
    this.emit("messageLogged", { id: 1, status: "Logged", url });
  };
}

// it exports the object
// module.exports.logges = log;

// it exports the function
module.exports = Logger;
