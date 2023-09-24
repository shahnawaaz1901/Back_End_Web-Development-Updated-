/*
    Benefits of Event Driven Architecture :
    1. Scalability : Using Event Driven Architechture we can Seprate Each of Work on Different 
                    Server easily so that it helps us to increase scalability of our project

    2. Loosely Coupling : Loosely Coupled means Less dependencies to each other. In our UserEvent 
                    Class we create a function postCreated and after post is created we use emit 
                    to tell that hey this postCreate event is occure but in that file no such actions 
                    is taken care after the post is created but in other file where we import class 
                    we addListeners and in every listener we pass a callback function. that callback 
                    function is also not know about userEvent class and event this is called loosely 
                    coupling, meanwhile both are not know to each other but works simontanously

    3. Better Responsiveness : After Seprate Each feature to different server this thing devide
                    server loads from one to different servers, so every server can easily response
                    and manage the requests
*/