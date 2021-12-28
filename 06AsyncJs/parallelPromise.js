const p1 = new Promise((resolve) => {
  console.log("Async Operation 1");
  resolve(1);
}, 2000);

const p2 = new Promise((resolve) => {
  console.log("Async Operation 2");
  resolve(2);
}, 2000);

// Here it deals with single thread only to execute all the promises
// Promise.all( [p1, p2] ).then( ( result ) => console.log( result ) );

// once when one promise is executed and finished first then we have to do something or say we have to print somethin for that use "race" rather than "all".
Promise.race([p1, p2]).then((result) => console.log(result));
