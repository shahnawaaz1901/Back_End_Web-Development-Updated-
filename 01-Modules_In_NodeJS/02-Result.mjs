/* 
    Using ES6 We Need to Change the Extension from js to mjs on both Files Where 
    Module is Exported and Where Module is Imported to use the modules
*/

/* 
    for Importing All Files From arithmetic_functions use * keyword 
    and a name which you want to store the module if You want to want
    to store only a specific file or function 
*/

/*
    Benefits of Using ES6 Module

    1. With ES6 Modules it Imroves Readability for the User
    2. Using ES6 Module Keeps Our WebApp lightWeight Because if we Import EveryThing
        using * keyword in our file then using ES6 modules if we not used some functions
        of files of imported modules then ES6 automatically Remove those modules which
        not used in file, So this Keeps Our file LightWeight So that if we want to Deploy 
        file then it takes less space compare to CommonJS module

*/
// You Can Write * for Import All functions, variables and classes
// You Can write explicitly name of every function, vaiable, classes within an Object
import * as arithmeticFunction from './02-Arithmetic_Functions_ES6.mjs'             // Valid
/* import {sum, maxPercent} from './02-Arithmetic_Functions_ES6.mjs' */             // Valid
// let sum = arithmeticFunction.sum(10, 20);
console.log(sum(10, 20));
// console.log(arithmeticFunction.maxPercent);
