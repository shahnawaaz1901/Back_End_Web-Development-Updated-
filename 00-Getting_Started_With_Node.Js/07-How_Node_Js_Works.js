/* 
    Node.Js is Run By Internally Event Loop

    WhenEver a Request Comes to Execute that request put in event queue. Every Request
    Comes is put in to the event queue.

    We All Know that javascript is a single threaded language, only single thread is
    called as main thread. Main Thread Responsibility is Picked task from the event
    queue.
    main thread checks that if request which is picked is require any external resources
    or we can say any i/o devices(databases , os, api some example of i/o operations).
    
    I/O operations can block the main thread. Let's take an example with databases operations
    where we read or write something in database this is expensive operations means it takes
    some time to complete the request. so if main thread starts perform i/o operations then
    main thread will be blocked and main thread can't pick any other request and main thread
    wait untils i/o operation is executed successfully. For Prevent this

    Event Loops Check does is this operation i/o operations, if yes then it's not main thread
    job in this case runtime comes into the picture because here Node.Js is runtime for 
    javascript then Node.Js Executes this type of I/O Operations which takes some time. Node.Js
    Puts I/O operation into the thread pool. WhenEver Node.Js execute operation then node.js put
    that handler function into the again event queue.

    Now the Question is where this thread pool comes this thread pool comes with node.js which is 
    the runtime similary runtime provide thread for handling i/o operations to make language faster
    and prevent stuck condition, withOut runtime javaScript is single thread and in single thread 
    every program is executed line by line operation no metter how much time operation consumes.

    Node.Js is mainly built for handling data intense applications

*/