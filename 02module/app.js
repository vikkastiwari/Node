// console.log(); // global

// we can access all using window. as prefix
// eg. window.setTimeout() but in node we dont have
// window object. Here we have global and we access it
// with the help of global eg. global.setTimeout()
// setTimeout();
// clearTimeout();

// setInterval();
// clearInterval();

var message = "";
// when we try to access message using global it gives undefinied
//  this is because the var and functions that we define here are not
// part of the global object it os limited to the file

// but it is added to the global scope which can be accessed by window object
// and it leads to a problem when we define two function in two other files
// but with same name
console.log(global.message);

// module - it is not a global object
// every file is termed as module in node
// every var and function that we define init is scoped to that module
// until we export it and make it public
console.log(module);
