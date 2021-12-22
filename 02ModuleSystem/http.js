const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Server is active");
    res.end();
  }
  if (req.url === "/courses") {
    res.write(JSON.stringify([1, 2, 3, 4, 5]));
    res.end();
  }
});

// server.on("connection", (socket) => {
//   console.log("New Connection");
// });

server.listen(5555);
console.log("Listening on port 5555..");
