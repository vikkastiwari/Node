const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    // author: authorSchema,
    //   passing authors in array
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find().populate();
  console.log(courses);
}

// createCourse("Node Course", [
//   new Author({ name: "Mosh" }),
//   new Author({ name: "John" }),
// ]);

async function updateAuthor(courseId) {
  // query - update - save
  //   const course = await Course.findById(courseId);
  //   course.author.name = "Vikas";
  //   course.save();

  // without quering first and then updating we can directly update the document in the list using update()
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $set: {
        "author.name": "John Smith",
      },
    }
  );
}

// updateAuthor("61d1268f61e9824b3664d121");

// listCourses();

// add and remove authors from the list of the array

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save(); // to update the changes in database
}

// addAuthor("61d13946b8429eab47833f37", new Author({ name: "Ammy" }));

// remove author from back
// async function removeAuthor(courseId) {
//   const course = await Course.findById(courseId);
//   course.authors.pop();
//   course.save(); // to update the changes in database
// }

// remove author with given id
async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save(); // to update the changes in database
}
removeAuthor("61d13946b8429eab47833f37", "61d13946b8429eab47833f35");
