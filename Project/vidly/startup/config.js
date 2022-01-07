const config = require("config");

module.exports = function () {
  // config
  if (!config.get("jwtPrivateKey")) {
    // console.log("FATAL ERROR: JWT PRIVATE KEY IS NOT DEFINED.");
    // process.exit(1);
    throw new Error("FATAL ERROR: JWT PRIVATE KEY IS NOT DEFINED.");
  }
};
