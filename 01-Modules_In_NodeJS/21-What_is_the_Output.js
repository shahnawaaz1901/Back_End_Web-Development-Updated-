/*
fs.readFileSync method

You are using fs.readFileSync to read the contents of a file in a Node.js 
application. If you omit the utf-8 encoding as the second argument, what will be returned?

1. The file contents as a Buffer object representing binary data.           // Correct
2. The file contents as a string.
3. An error will be thrown because utf-8 is a required argument.
4. The file contents as an array of characters.

Solution Description : When the utf-8 encoding is omitted in the fs.readFileSync 
                method in a Node.js application, the returned value will be a Buffer 
                object that represents the binary data of the file.
*/