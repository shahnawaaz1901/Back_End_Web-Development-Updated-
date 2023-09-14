const http = require('http');
const server = http.createServer((request, response)=>{
    response.write('Hey this is Sent By Write Function :');                 // Send Response But Not Ended
    if(request.url == '/user'){
        return response.end('Hey this is User Page : ');                   // End the Response
    }else if(request.url == '/product'){
        return response.end('hey this is product Page');
    }
    console.log(request.url);                           // Print Every URL which User Requested

    // You Can Not Write this because you ends response on if else condition so that if we return from if else then we make this request
    response.end('Hey page is Loaded Successfully ');
});

server.listen(8000, function(error){
    if(error){
        console.log(error);
        return;
    }
    console.log('Server is Up and Run on Port : 8000');
})