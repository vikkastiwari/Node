const validateObjectId = require("../middleware/validateObjectId");
// as we are using express-async-errors package it makes easier for us to make call without even importing and calling the asyncMiddleware function
// const asyncMiddleware = require("../middleware/async");
const { Genre } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validate = require("../middleware/validate");

// router.get("/", async (req, res, next) => {
//   try {
//     const genres = await Genre.find().sort("name");
//     res.send(genres);
//   } catch (ex) {
//     // 500 - Internal server error
//     // res.status(500).send("Something Failed.");

//     //   as in error function defination we handled error at one place and placed that function after all the other ones
//     //   so the next will make call and end up in that error function in last where error is handled
//     next(ex);
//   }
// });

// now we encapsulated our async promise handler by removing try catch block - we encapsulated
// router.get(
//   "/",
//   asyncMiddleware(async (req, res) => {
//     const genres = await Genre.find().sort("name");
//     res.send(genres);
//   })
// );

// using express-async-errors here no import or call of asyncMiddleware is required
router.get("/", async (req, res) => {
  // to demonstrate error - logger
  //   throw new Error("Could not get the genres.");
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", [auth, validate(validateGenre)], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.get("/:id", validateObjectId, async (req, res) => {
  // we have added validateObjectId middleware because while we do integration testing and id is not correct our winston error handler middleware handles it with code of 500 and we expect 404 while assertion

  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

function validateGenre(req) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
