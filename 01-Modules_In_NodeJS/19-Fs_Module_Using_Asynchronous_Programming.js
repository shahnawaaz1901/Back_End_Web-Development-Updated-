/* 
    We Will See FS functions Using Asychronous Programming in this File.
    Using Asynchronous Programming Statement which is directly Printing is Print first
*/

// Import Module
const fs = require('fs');

// Read file Asynchronously
fs.readFile('./19-File_Using_in_Read.txt',function(error, data){
    if(error){
        console.log(error);
        return;
    }
    console.log(data.toString());
})

// Write File Asynchronously
fs.writeFile('./19-File_Using_in_Write.txt','Name : Shahnawaaz Ansari',function(error){
    if(error){
        console.log(error);
        return;
    }else{
        console.log('File is Created Successfully !! ')
    }
})

// Update File Asynchronously
fs.appendFile('./19-File_Using_in_Write.txt',' Name : Zakir Hussain',function(error){
    if(error){
        console.log(error);
        return;
    }else{
        console.log('File is Updated Successfully !!');
    }
})

// Unlink File Asynchronously
fs.unlink('./19-File_Using_in_Write.txt',function(error){           //Only Error in Argument Because callback not get any data excep error
    if(error){
        console.log(error);
        return;
    }else{
        console.log('File is Deleted Successfully !!');
    }
})
console.log('Last Line on the Code');


/*
    Because This is a Asynchronous Programming SO that We Can't predict which function
    execution is completed first
*/

/*
    File System is a Part of Operating System
*/