const p = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log("Async Function Defination");
    // resolve(1); // pending => resolved or fullfilled
    reject(new Error("Error Handled successfully")); // pending => rejected
  }, 2000);
});

p.then((result) => {
  console.log(result);
}).catch((err) => {
  console.log("Error:", err.message);
});
