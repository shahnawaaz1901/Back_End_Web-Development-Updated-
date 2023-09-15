/*
Client-Server Architecture

Which of the following statements about the creation of a server using the 
HTTP module in Node.js is/are correct?

1. The listen() method starts the server and listens for incoming connections on            // Correct
    the specified port.
2. The client sends a request to the server, and the server processes the request           // Correct
    and sends the response back to the client.
3. The server creates a new instance of the response object for each incoming request.      // Correct
4. The request listener callback of the createServer() method on the HTTP module accepts    // Correct
     two callbacks as arguments: request and response.

Solution Description : The request listener callback is intended to take two objects 
                        as parameters, not callbacks, thus the statement is incorrect.
*/