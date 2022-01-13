// validate function - It validates the request
module.exports = (validator) => {
  return (req, res, next) => {
    // validating error with joi
    const { error } = validator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    next();
  };
};
