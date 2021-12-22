const fs = require("fs");

const files = fs.readdirSync("./");
console.log(files);

// Each function is available in sync and async

// In call function which is passed as an argument their are two arguments error and files(results) where at a time only one argument holds the value and the other one is false.

fs.readdir("./", (err, files) => {
  err ? console.log(err) : console.log("Result", files);
});
