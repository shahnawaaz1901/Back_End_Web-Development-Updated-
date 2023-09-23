/*
    Postman is tool which Allows Us to Make Post Request or api request to the Server 
    WithOut Creating UI to test the API.
    Postman is Acting Like Client Because Client make post request
*/

// Create Http Server and Handle Events
const http = require('http');

// Create Server
const server = http.createServer((request, response)=>{
    // event is an asynchronous operation thats why always write outside statement in else because node.js prints those statement first
    if(request.method == 'POST'){
        let body = '';
        // Data Event is Occure When Start receiving Data in Form of Stream in the chunks or Parts
        request.on('data',function(chunks){
            const chunksInString = chunks.toString();
            body += chunksInString;
        })

        // end Event is Occure when All data is received on server
        request.on('end',function(){
            console.log(body);
            response.end('Data Received Successfully !! ');
        })
    }else{
        console.log('Data Not Received');
        response.end('Welcome to Node.JS ');
    }
});

// Listening the Server
server.listen(3100,function(){
    console.log(`Server is Up and Run on Port : 3100`);
})
