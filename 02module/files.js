const fs = require("fs");

const files = fs.readdirSync("./");
console.log(files);

// each function is available in sync and async

fs.readdir("./", (err, files) => {
  err ? console.log(err) : console.log("Result", files);
});
