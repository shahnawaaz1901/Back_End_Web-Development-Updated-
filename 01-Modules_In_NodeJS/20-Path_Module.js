/*
    Why Path Module : Let's Suppose We Have an file which is contain in some folder
    which folder is available in our main folder where we have a file where we access
    that file by writing folder name and then file name, but problem is sometime
    whenever we write same code within different kind of os, accessing path have different
    syntax like in windows access folders by forward slash but in mac folder access by
    backslash so this a huge Problem, 
    in Windows :- D:\Career\MERN Stack Course
    in Max :- D/Career/MERN Stack Course
    
    
    So Fixing that problem path module is introduced
*/


/*
    Path Module : Path Module is a module which can helps us to access folders in such
    way that folder address is automatically set according to the OS. Path Module Insures
    that our program is cross platform program.
    Path Module is the Core Module of Node.JS
*/

const fs = require('fs');
const path = require('path');
// path.join gives us path of file from current directory
const filepath = path.join('pathmodule','src','index.txt');
console.log(filepath);                  // Print Path According to OS path syntax

// path.resolve gives us path of file from the root directory
const filepathResolve = path.resolve('pathmodule','src','index.txt');
// console.log(filepathResolve);           

fs.readFile(filepath, "utf8",function(error, data){
    if(error){
        console.log(error);
        return;
    }
    console.log(data);
})

// From Path Module We Can Check the Extension of Files
console.log(path.extname(filepath));
