const http = require('http');
const fs = require('fs');   


const server = http.createServer((request, response)=>{
    const data = fs.readFileSync('./15-HTML_File.html');
    response.end(data);
})

const port = 8080;
server.listen(port, function(error){
    if(error){
        console.log(`Error : ${error}`);
        return;
    }

    console.log(`Server is Working Fine On Port : ${port}`);
});