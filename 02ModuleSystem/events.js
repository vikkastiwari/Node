// EventEmitter is class and that is how the convention goes

const EventEmitter = require("events");
console.log(EventEmitter);

// object of the above class
const emitter = new EventEmitter();
console.log(emitter);

// register a listener
emitter.on("messageLogged", (arg) => {
  console.log("Listener Called", { ...arg });
});

// emit - making a noise | signalling that event has happened
emitter.emit("messageLogged", { id: 1, url: "http://pm.com" });
