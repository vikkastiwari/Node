const Joi = require("joi");
const express = require("express");
// const { func } = require("joi");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" },
];

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

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
    return res
      .status(404)
      .send(`The course with the Id: ${req.params.id} was not found`);

  res.send(course);
});

// Post request
app.post("/api/courses", (req, res) => {
  // we clean the code by creating function validation and written new code
  const { error } = validateCourse(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //   validation with Joi package
  //   const schema = Joi.object({
  //     name: Joi.string().min(3).required(),
  //   });

  //   const result = schema.validate(req.body);
  //   console.log(result);

  //   if (result.error) {
  //     res.status(400).send(result.error.details[0].message);
  //     return;
  //     }

  // Manual validation
  //   if (!req.body.name || req.body.name.length < 3) {
  //     res
  //       .status(400)
  //       .send("Name is required and should be minimum 3 characters.");
  //     return;
  //   }

  // request handler
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// Put request
app.put("/api/courses/:id", (req, res) => {
  // look up the course
  // if not exisiting, return 404

  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res
      .status(404)
      .send(`The course with the Id: ${req.params.id} was not found`);
  }
  // validate
  // if invalid, return 404 - bad request

  // we clean the code by creating function validation and written new code
  const { error } = validateCourse(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // old way

  //   const schema = Joi.object({
  //     name: Joi.string().min(3).required(),
  //   });

  //   const result = schema.validate(req.body);

  //   if (result.error) {
  //     res.status(400).send(result.error.details[0].message);
  //     return;
  //   }

  // update course
  // return the updated course
  console.log(req.body.name);
  course.name = req.body.name;
  console.log(course.name);

  res.send(course);
});

// deleting the course
app.delete("/api/courses/:id", (req, res) => {
  // validation
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send(`The course with the Id: ${req.params.id} was not found`);

  // delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // return
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
