// Import File System Module
const { isUtf8 } = require('buffer');
const fs = require('fs');

console.log('Starting to Read the file');

// Read File Synchronously through readFileSync function which block code
const buffer = fs.readFileSync('./17-text.txt');            // Return file in UTF8 Encoded form
console.log(buffer);
/* 
    Buffer : When We Call a function and function returns something which we can't 
    receive in variable but directly use that return value somewhere. Now Question is
    where value is store value is stores in buffer. Buffer is a temporary Storage to
    store something during the execution or sending or receiving the file
*/
const bufferInStr = buffer.toString();                      // Convert UTF8 encoded file into string
console.log(bufferInStr);
/* 
    Here First We read the data synchronously using readFileSync function and after 
    that convert it into string format, so we do extra work for saving extra work time
    we can directly read file into the string format by passing the object of encoding
*/

// Passing the encoding format
const directlyBuffer = fs.readFileSync('./17-text.txt',{encoding : 'utf8'})
console.log(directlyBuffer);
console.log('Ending the Read file');