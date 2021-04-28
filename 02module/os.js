const os = require("os");
// console.log(os);

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

var upTime = os.uptime();

console.log(`totalMemory: ${totalMemory}`);
console.log(`freeMemory: ${freeMemory}`);
console.log(`upTime: ${upTime} sec`);
