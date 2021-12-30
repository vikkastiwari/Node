const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => console.log("Connected to Mongodb..."))
  .catch((err) => console.log(err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  // it is defined with a default value so for this we are not required to pass any data while writing to documents
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// model creation - it is a class
const Course = mongoose.model("Course", courseSchema);

// create course
async function createCourse() {
  // object defined from class
  const course = new Course({
    name: "Nodejs course",
    author: "Vikas",
    tags: ["node", "angular"],
    isPublished: true,
  });

  // .save() returns promise so to handle that we are using async & await
  const result = await course.save();
  console.log(result);
}

// createCourse();

// get courses
async function getCourses() {
  // example of pagination
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({
    author: /.*Vikas.*/,
    isPublished: true,
  })
    // pagination implementation
    .skip((pageNumber - 1) * pageSize)
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  // .count();
  console.log(courses);
}

getCourses();
