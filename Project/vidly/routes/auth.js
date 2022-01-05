const { User } = require("../models/user");
const JWT = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { valid } = require("joi/lib/types/lazy");
const Joi = require("Joi");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (!user) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    // we can pass parameters but in this case we dont need any
    const token = user.generateAuthToken();

    // const token = JWT.sign(
    //   { _id: user._id, name: user.name },
    //   config.get("jwtPrivateKey")
    // );
    res.send(token);
  } catch (ex) {
    if (ex) console.log(ex.message);
  }
});

function validate(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(user, schema);
}

module.exports = router;
