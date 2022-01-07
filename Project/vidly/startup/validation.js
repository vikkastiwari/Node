const Joi = require("joi");
// Joi is a validation library that allows you to build schemas to validate JavaScript objects.
module.exports = function () {
  Joi.objectId = require("joi-objectid")(Joi); // it returns functions so we need to pass reference to JOI module
};
