const mongoose = require("mongoose");
const id = new mongoose.Types.ObjectId();
console.log(id);
console.log(id.getTimestamp());

const isVal = mongoose.Types.ObjectId().isValid("1211");
console.log(isVal);
