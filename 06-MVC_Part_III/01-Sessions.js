/*
 * Sessions : Sessions is a Mechanism Which Connects Client With the Server
    Currently We Use the HTTP Protocol Client Sends request to the server
    and Server Gets Respond to the Client.
    But HTTP is Stateles Protocol means HTTP doesn't have state means HTTP
    Doesn't have State B/W Client and Server. Which Means Every Request for
    Server and Every Response to the Client is Independent Which Means No
    Ongoing State Between Client and Servers. Stateless means requests is
    independent to each other and a request nothing to do with other request.

    In Twitter, Instagram and Facebook First we Logged in and After the login
    whenever you make any post how server knows that you loggedin previously
    and the person which loggedin try to make post, because this type of request
    is dependent to the User so this is stateful Communication.

    But http is stateless protocol how can we make this stateful communication
    by using http a stateless protocol. For fixing this problem "SESSION" is
    introduced.

    When Ever We Logged in Server gives us a session Id which session Id Stores
    in Our Browser in the form of Cookie. So when ever We Send Request to the 
    Server Along with that request cookie is sent so that server can identify
    that that user and make changes corresponding to that user.and When Ever We
    logged Out Session is Clossed. Session ID stores in server and and same session
    ID stores in Browser in the form of Cookie. Cookie is nothing to do with the 
    server. Session ID is a Unique id for Every User and We Can't Stores sensitive
    information in Sessions. Main Purpose of Session is Make Stateful Communication
    by using stateless protocol.
*/

/*
Sessions in Node.js

Which statement(s) is/are true about sessions in Node.js?

1. Sessions help maintain stateful communication between a client and       //*Correct
    a server in a stateless protocol like HTTP.
2. Sessions are generated by the server and sent to the client in the       //*Correct
    form of a cookie.
3. Sessions can be used for securing user sessions and implementing         //*Correct
    user-specific features.
4. Sessions are stored in a database on the server.

Solution Description : Sessions in Node.js help maintain stateful communication, are 
                generated by the server as cookies, and can be used for securing user 
                sessions and implementing user-specific features. They can be stored in 
                different locations, not necessarily limited to databases.
*/