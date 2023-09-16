/* 
    For Call Arithmetic File functions From this File Node.JS introduce Modules for Solving 
    This, with Modules we Can Use Another File functions on this file with import that file.
    Modules Can be Anything it can be class, functions, variable etc which you can share to
    other files.
    Functions Which Exports in Module File is Now Property of that File Object
*/

// For Access Modules Files through CommonJS, First You Need to Import that file
const arithmeticModule = require('./00-Arithmetic_Functions_CommonJS.js');
const arithmeticModule2 = require('./00-Arithmetic_Functions_CommonJS.js');
/* 
    If We Import Same File Two Times Both Files Not Loaded File is Only Loaded Once Because Once 
    File is Loaded File is Stores in Cache Memory So that Require file Already in Cache so 
    Node.JS Not Loaded File Again
*/
// Call Modules Functions
let sum = arithmeticModule.sum(3, 4);
console.log(sum);
