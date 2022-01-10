const mongoose = require("mongoose");
// we have added this because while we do integration testing and id is not correct our winston error handler middleware handles it with code of 500 and we expect 404 while assertion
module.exports = function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid Id");

  next();
};
