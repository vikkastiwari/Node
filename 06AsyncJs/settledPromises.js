// In settled promise we already know that if the promise is to be resolved or rejected
const p = Promise.resolve({ id: 1 });
p.then((result) => console.log(result));

// reject in promises
const p1 = Promise.reject(new Error("Message: The promise is rejected."));
p1.catch((error) => console.log(error));
