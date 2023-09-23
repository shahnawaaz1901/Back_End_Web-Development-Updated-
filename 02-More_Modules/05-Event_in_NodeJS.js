/*
    Event : Any Change in Application is Called as Event.
    JavaScript Has Multiple Events :
    1. MouseClick Event
    2. MouseOver Event
    3. Scroll Event etc.
*/

/*
    Event in Three Steps :
    1. A Change in Data
    2. A Change in File
    3. A click of Button
*/

/*
    How Event Work :
    When Event is Occur then it's Corresponding EventListner called.
    Some Time One Event is Occure Multiple Event Listener is Called.
*/

/*
    Inbuilt Event on Node.JS :
    1. Data : WhatEver Data Server Takes from the user it's not received in simple form.
            Data received in stream. Data Receive in chunks or you can say parts which is 
            managed by buffer(a temporary memory)
    2. Error : Triggered When Error is Occure
    3. Listener
*/

/*
    Get Request : WhatEver Request Browser Requested for a Specific URL it's Called get Request 
            You Can check request type in inspect section in header section of browser
    Post Request : WhatEver Data User want to send to the server it's called Post Request.

    Get Request is Request which is able sent to server withOut an Ui but post request is the
    request which needs an Ui to make Post request to the server.
    But for Every Time make Post Request we Need to Create a front end UI to make post request
    but some tools is available which helps us to make post request withOut an UI one of them 
    is postman.
*/

// Create Http Server and Handle Events
const http = require('http');
const server = http.createServer((request, response)=>{
    if(request.method == "post"){                           // Check Request Type
        let body = '';
        
        // data Event to Collect the Data WhatEver User Send to Server
        request.on('data',(chunks)=>{                           // Take Chunks as Argument
            let chunksData = chunks.to_string();                // Convert Chunks into the string form
            body += chunksData;                                 // add that string into the body
        })

        // end Event is Occure after all chunks is received
        request.on('end',function(){                            // not Take Argument Because here end event triggered after all Data is Received
            console.log(`Data is Received Successfully : ${body}`);
            response.write('Data is Received Successfully !!');
        })
    }


    response.end('Welcome to Node JS');                     // Send Response to the Server
});

server.listen(3100, function(){
    console.log('Server is Up and Run on Port 3100');
})