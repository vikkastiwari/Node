// Async structure
// callback hell can be resolved using named function
console.log("before");
getUser(1, getRepo);
console.log("after");

function getRepo(user) {
  getRepo(user.name, getCommit);
}

function getCommit(repos) {
  getCommit(repos, displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Encoding secret file...");
    callback({
      id: id,
      name: "vikas",
      message: "Hello",
    });
  }, 2000);
  // time in ms

  return "outside async block - in function scope";
}

function getRepo(username, callback) {
  setTimeout(() => {
    console.log("Repo Details");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
  return "getReop Executed";
}

function getCommit(repo, callback) {
  setTimeout(() => {
    console.log("Calling Github API...");
    callback(["commit"]);
  }, 2000);
}
