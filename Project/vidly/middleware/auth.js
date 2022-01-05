const jwt = require("jsonwebtoken");
const config = require("config");

// auth -> authorization
// verify jwt token

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied: No token provided.");

  try {
    // verify
    // we get decoded payload
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    //   pass control to the next middleware function
    next();
  } catch (ex) {
    //   terminate
    res.status(400).send("Invalid Token");
  }
};
