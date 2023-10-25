/*
HTTP Status Code

In a RESTful API, when a client requests to add a new item (POST request), 
which HTTP status code typically signifies that the item was added successfully 
and what is expected to be returned in the response?

1. The server responds with a 200 status code and an empty body.
2. The server responds with a 201 status code and the newly added           //* Correct
    item.
3. The server responds with a 201 status code but doesn't include       
    the newly added item.
4. The server responds with a 200 status code and the newly added item.
Hurray! Correct Answer
Solution Description
As per the HTTP/1.1 specification, a POST request that results in the creation of a new resource should respond with a 201 (Created) status code. It is also a common practice to include the newly created resource in the response to confirm its creation and to provide the client with the new resource's details, including any server-generated fields like its ID.*/