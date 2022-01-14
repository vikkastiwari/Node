const helmet = require("helmet");
const compression = require("compression");

module.exports = function (app) {
  // we call it as a function in order to get a middleware function
  app.use(helmet());
  app.use(compression());
};
