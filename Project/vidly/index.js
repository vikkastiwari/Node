const express = require("express");
const app = express();
const logger = require("./middleware/logger");

// passing reference of app as parameter rather than initializing again and again
require("./startup/logging")(); // put this first always
require("./startup/routes")(app);
require("./startup/database")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
