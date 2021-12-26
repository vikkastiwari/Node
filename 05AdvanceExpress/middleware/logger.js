function log(req, res, next) {
  console.log("Logging...");
  // next past the request to the other middleware in the pipeline
  next();
}

module.exports = log;
