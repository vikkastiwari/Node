const bcrypt = require("bcrypt");

async function run() {
  // salting - adding random text to hashed password
  const salt = await bcrypt.genSalt(10);
  // hashing password
  const hashed = await bcrypt.hash("1234", salt);
  console.log(salt);
  console.log(hashed);
}

run();
