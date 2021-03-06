// return rental movie back
// we are writing this end point with test driven approach

// Testcases
/*
1. Return 401 if client is not logged in
2. Return 400 if customerId is not provided
3. Return 400 if movieId is not provided
4. Return 404 if no rental found for customer & movie
5. Return 400 if rental already processed   
// after all above checks now it should be valid
6. Return 200 if request is valid
7. Set the return date
8. Calculate the rental fee
9. Increase the stock
10. Return Rental
*/

const Joi = require("joi");
const express = require("express");
const moment = require("moment");
const router = express.Router();
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

// to check authorization testcase we passed auth middleware
// The way we added auth middleware in same manner we are adding validate middleware
router.post("/", [auth, validate(validateReturn)], async (req, res) => {
  // validating without joi
  //   if (!req.body.customerId)
  //     return res.status(400).send("customer id is not provided");
  //   if (!req.body.movieId)
  //     return res.status(400).send("movie id is not provided");

  // we moved this in userdefined function with the help of static method
  //   const rental = await Rental.findOne({
  //     "customer._id": req.body.customerId,
  //     "movie._id": req.body.movieId,
  //   });

  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

  if (!rental) return res.status(404).send("no rental found");

  if (rental.dateReturned)
    return res.status(400).send("return already processed");

  rental.return();
  await rental.save();

  // update and increase the number in stock
  await Movie.update(
    { _id: rental.movie._id },
    {
      $inc: { numberInStock: 1 },
    }
  );

  return res.status(200).send(rental);
});

function validateReturn(req) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
