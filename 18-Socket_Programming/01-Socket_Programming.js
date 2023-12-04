/*
    Socket Programming or Sockets : 

    Last time we talk about the chat application and identify the problems which 
    occure using http protocol in REST API. This Problem can be fix using the
    Sockets or Socket programming. Now what is Sockets .?
    
    Socket is create an ongoing persistent connection between server and client
    so we save the time for verification which we do in http request and save
    the load and prevent lack of speed issue in our server. By using the socket
    we have one more advantage that is "now server knows us and server know our
    address (means IP addres)". Now we dont need to send notification for every
    5 seconds to the server for a notification. Server sends notification to us
    when ever something arrived for us. So we can say Socket Programming Helps
    to interact two persons in efficient way on a server

    
    Advantage of Socket Programming : 

        1. Real Time communication : because in http protocol request is sent by us in every 
                        5 seconds so there is delay of 5 second but using sockets its sends 
                        notification immediately in real time.
        
        2. Lower Letancy : Because Real time communication
        
        3. Enhance User experience : Because user can interact with each other in real time 
                        this also saves user time and very useful to the user

    Applications of Socket Programming : 

    1. In Chat Applications
    2. Notifications
    3. Live Updates
    4. Collabrative tools such as Google Docs


    DisAdvantage of Socket Programming : 
        
        1. Increased Complexity

        2. Security Restrictions : Because we need to be careful to enstablish a persistent 
                        connection from server to the user because if we make some mistakes
                        and make some problem while connection then it occure some data breaches
                        problem

        3. Difficult to maintain : Because Complex Structure of Code

*/
