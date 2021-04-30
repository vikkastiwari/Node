var _ = require("underscore");
// require module resolves the module in the following flow
// 1. Core Module
// 2. File or Folder
// 3. node_modules

// Doc - underscorejs.org

var result = _.contains([1, 2, 3], 2);
console.log(result);
