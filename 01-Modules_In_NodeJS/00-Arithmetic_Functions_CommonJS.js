
function multi(a, b){
    return a *b;
}

function devide(a, b){
    return a/b;
}

/*
    Two Ways For Creating JavaScript File as Module is Exist :
    1. Common JS                                                    Older Version
    2. ES6 (Ecma Script 6(Version of JavaScript))                   Newer Version
*/

// Exports Through CommonJS
module.exports.sum = (a, b)=>{
    return a + b;
}
// WithOut exports You Can't Use this function outside the file
function subs(a, b){
    return a - b;
}
console.log('Arithmetic Function is Loaded');

//Export Through ES6