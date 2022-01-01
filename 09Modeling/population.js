const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
  })
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    // embeded documents
    name: String,
    // passing author reference as object
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  //  when we pass name with author then we get the reference of author with which we can log the properties that we want
  // populate helps to log the properties of emebedded documents  like author
  const courses = await Course.find()
    .populate("author", "name bio")
    //   It is possible to populate multiple properties
    // .populate("category", "name")
    .select("name author");
  console.log(courses);
}

// createAuthor("Mosh", "My bio", "My Website");

// pass valid author Id
// createCourse("Node Course", "61cfd17faedfa456c33a588e");

listCourses();
