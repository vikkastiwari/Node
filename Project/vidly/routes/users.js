const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");
const JWT = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

// filter the user details without password
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) return res.status(400).send("User already registered.");

    // user = new User({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: req.body.password,
    // });

    user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    // hashing password
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();

    // res.send({
    //   name=user.name,
    //   email=user.email,
    // } );

    const token = JWT.sign({ _id: user._id }, config.get("jwtPrivateKey"));
    //   using lodash
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));
  } catch (ex) {
    if (ex) console.log(ex.message);
  }
});

module.exports = router;
