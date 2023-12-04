/*
    We Learn that Client sent the request to the server and server send response to 
    the server. Which is recieved by the client but is this enough for all kind of 
    applications because in some cases like when two persons talk in chat and one 
    person send a massage to the second person and second person gets notification
    that first person send the massage to him/her. For this multiple techniques are
    exist one is long polling and other is using the socket programming.

    Long Polling : Long Polling Techniques is used in rest API when we use the http
            protocol, we all know that http has the stateless protocol means for 
            every request we need to verify the request by passing some credentials
            or some token like JWT which we implement already. In Long Polling technique
            server not send the notification to the user because using http protocol
            server get the details which user one person send the massage but just
            because http is stateless server dont know where the reciever is so that
            client sends request in every 5 second to the server that hey some notification
            for me but in this process server do lot of work because server uses to http
            protocol so first user (which send the request to know that is there any
            notification for me or not) needs to verify itself that hey i am this user
            this verification done every time when user sends request to the server 
            because http is stateless so we can say our server needs to identify every
            user 12 times in a minute. if number of user is 1 lac then our server verify
            all users 12 lac times in a minute this occurs performance issue and heavy
            load on the server because server load is increase as user is increased.
            So this technique not use in huge application its work on small applications.
            For Fixing this issue we use the socket programming.
*/