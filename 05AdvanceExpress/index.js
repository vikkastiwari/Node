const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const express = require("express");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const app = express();

// templating engine
app.set("view engine", "pug");
// optional setting
app.set("views", "./views"); // default

// configuration
console.log("Application Name:" + config.get("name"));
console.log("Mail Server:" + config.get("mail.host"));
console.log("Mail Password:" + config.get("mail.password"));

// console.log(`Node environment: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get("env")}`);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

//www.npmjs.com/package/morgan
// suppose we want it to enable in only development mode then
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  //   console.log("morgan enabled...");
  startupDebugger("morgan enabled...");
}

// some db work
dbDebugger("Connected to the database...");

app.use(logger);

app.use(function (req, res, next) {
  console.log("Authenticating...");
  // next past the request to the other middleware in the pipeline
  next();
});

// multi parameter
app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params);
});

// query parameter
app.get("/api/posts/:year", (req, res) => {
  res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
