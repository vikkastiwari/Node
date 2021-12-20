const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" },
];

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// single parameter
app.get("/api/courses/:id", (req, res) => {
  //   res.send(req.params);
  //   console.log(req.params);
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given ID was not found");
  res.send(course);
});

// Post request
app.post("/api/courses", (req, res) => {
  //   validation with Joi package
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body.name, schema);
  console.log(result);

  // Manual validation
  if (!req.body.name || req.body.name.length < 3) {
    res
      .status(400)
      .send("Name is required and should be minimum 3 characters.");
  }

  // request handler
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
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
