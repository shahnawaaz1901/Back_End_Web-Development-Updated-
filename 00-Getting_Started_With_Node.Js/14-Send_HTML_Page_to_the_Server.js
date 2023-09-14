const http = require('http');
const fs = require('fs');               // Import For Reading HTML File
const port = 8000;
const server = http.createServer((request, response)=>{
    const data = fs.readFileSync('./14-HTML_File.html').toString();     // Read file and Convert into String
    response.end(data);
});

server.listen(port, function(error){
    if(error){
        console.log(`Error : ${error}`);
        return;
    }
    console.log(`Server is Up and Run : ${port}`);
})