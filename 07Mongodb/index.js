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
  const courses = await Course
    //     .find( {
    //   author: "Vikas",
    //   isPublished: true,
    // })

    // starts with case sensitive
    // .find({
    //   author: /^Vikas/,
    //   isPublished: true,
    // })

    // Ends with + case insensitive
    // .find({
    //   author: /Tiwari$/i,
    //   isPublished: true,
    // })

    // contains Vikas
    .find({
      author: /.*Vikas.*/,
      isPublished: true,
    })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  // .count();
  console.log(courses);
}

// getCourses();

//  Update Course - Query First
async function updateCourse1(id) {
  const course = await Course.findById(id);
  if (!course) return;

  // approach 1
  course.isPublished = false;
  course.author = "New";

  // approach 2
  //   course.set({
  //     author: "New",
  //     isPublished: true,
  //   });

  const result = await course.save();
  console.log(result);
}

// update document - update first
async function updateCourse2(id) {
  // here we are not required to save the changes explicitly we directly print the results
  //   const result = await Course.updateOne(
  //     { _id: id }, // query object
  //     {
  //       $set: {
  //         author: "Update first",
  //         isPublished: true,
  //       },
  //     }
  //   );

  // to update and retervie updated value we use findByIdAndUpdate() this return object which we print

  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jhon",
        isPublished: true,
      },
    },
    { new: true } // without this object, the function returns the updated value
  );

  console.log(course);
}

// updateCourse2("61cc0601854f3ab08cb8c78f");

// remove course
async function removeCourse(id) {
  const course = await Course.deleteOne({ _id: id });
  console.log(course);

  // To get the result of deleted field use findByIdAndRemove() which returns object

  // If we dont have course with given id it will return NULL
}

removeCourse("61cc0601854f3ab08cb8c78f"); // pass Id wrt your collection
