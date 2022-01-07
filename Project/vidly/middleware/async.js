// async function error handler
// asyncMiddleware function
module.exports = function (handler) {
  return async function (req, res, next) {
    try {
      await handler(req, res);
    } catch (ex) {
      // ex - exception
      next(ex); // error middleware called - reference passed from index.js to error middleware
    }
  };
};
