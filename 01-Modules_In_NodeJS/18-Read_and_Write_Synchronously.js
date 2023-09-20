// Import Module
const fs = require('fs');

/* Not Use Because Not Handling Error
// Create file using fs with synchronous opeation
fs.writeFileSync('18-Create_by_fs_Module.txt',"name : Shahnawaaz Ansari");
fs.writeFileSync('18-Create_by_fs_Module.txt',"name : Ashu Ansari");
*/
/* 
    if You Use WriteFileSync multiple time to create same name file then only 
    last file which is created is override all files. With the help of synchronous
    operation you can create file using writeFileSync and read that file in same 
    file.
*/

/*
    In Our System Some Directory Where Operating System Not Allow to Write on that
    directory so that we always use any write function in  try and catch
*/

// Always Write file within proper error handling Because OS not allow write opreation in all directories
try {
    fs.writeFileSync('18-File_Created_using_Write.txt',"name : Shahnawaaz Ansari Father Name : Zakir Hussain")
} catch (error) {
    console.log(error);
}

// Read File Synchronously
const dataRead = fs.readFileSync('./18-File_Created_using_Write.txt',{encoding : 'utf8'});
console.log(dataRead);



// We Can Also Append Data on Some Existing File
fs.appendFileSync('./18-File_Created_using_Write.txt',"Name : Zakir Hussain, Father Name : Mohammad Ishaq");

// Print File Again After Append Data
console.log(fs.readFileSync('./18-File_Created_using_Write.txt',{encoding : 'utf8'}));

/*
    If File Which We Want to Update is Not Exist then appendFileSync Function creates
    new file and append that data which is passed by us on that file
*/

fs.appendFileSync('./18-File_Created_using_Append.txt','Name : Shahnawaaz Ansari, Father Name : Zakir Hussain');
console.log(fs.readFileSync('./18-File_Created_using_Append.txt',{encoding : 'utf8'}));


/*
    We Can Also Delete File Using fs Module with the help of unlinkSync function, Why
    name unlinkSync because Node.Js Not have enough power because Actual Power of Deletion
    Operating System has. So Node.Js Breaks Link of that file from OS and rest of Work
    will be done by OS
*/

// Not Use Because Not Error Handling
// fs.unlinkSync('./18-File_Created_using_Append.txt');

/* 
    In Some Scenario File is Not Exist or Any Kind of Error is Occure so Always write
    unlink function within try catch
*/

try {
    fs.unlinkSync('./18-File_Created_using_Append.txt');
} catch (error) {
    console.log(`File Doesn't Exist`);''
}

/* 
    We Seen All Require Function CRUD (create, read, update and delete) using Synchronous 
    Programming, this synchronous programming can block main thread so that we need to use
    asynchronous programming for that.
*/