// Async structure
// console.log("before");
// getUser(1, (user) => {
//   console.log("User Data:", user);
//   getRepo(user.name, (repos) => {
//     console.log("Repo Name:", repos);
//     getCommit(repos[0], (commits) => {
//       console.log(commits);
//     });
//   });
// });
// console.log("after");

// Promise based approach
// console.log("before");
// getUser(1)
//   .then((user) => getRepo(user))
//   .then((repos) => getCommit(repos[0]))
//   .then((commits) => console.log(commits))
//   .catch((err) => console.log(err.message));
// console.log("after");

// async and await approach
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repo = await getRepo(user.name);
    const commits = await getCommit(repo[0]);
    console.log(commits);
  } catch (error) {
    console.log(error.message);
  }
}

displayCommits();

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Encoding secret file...");
      resolve({
        id: id,
        name: "vikas",
        message: "Hello",
      });
    }, 2000);
    // time in ms

    return "outside async block - in function scope";
  });
}

function getRepo(username, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Repo User");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommit(repo, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling Github API...");
      resolve(["commit"]);
    }, 2000);
  });
}
