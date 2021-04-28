var url = "http://mylogger.io/log";

const log = (message) => {
  console.log(message);
};

// it exports the object
// module.exports.logges = log;

// it exports the function
module.exports = log;
