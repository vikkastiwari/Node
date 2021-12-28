// Async structure
console.log("before");
getUser(1, (user) => {
  console.log("User Data:", user);
  getRepo(user.name, (repos) => {
    console.log("Repo Name:", repos);
    getCommit(repos[0], (commits) => {
      console.log(commits);
    });
  });
});
console.log("after");

// Sync structure
// console.log("before");
// const user = getUser(1);
// const repos = getRepo(user.name);
// console.log("after");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Encoding secret file...");
    // "It is not displayed because when after 2s the function returns the value it doesn't reach back to function call.",
    //   The issue can be solved using callback
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
