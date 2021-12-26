const { Router } = require("express");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //   res.send("Hello Express");
  res.render("index", { title: "My express app", message: "Hello Folks" });
});

module.exports = router;
