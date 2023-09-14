/*
    Question is how Node.Js is handled asynchronous operations to put request into the 
    thread pool how to take request from event queue this is done by LibUV library which
    is used by Node.Js.

    Libuv : Libuv is multi platform support library which manages asynchronous I/O.

    Because of Libuv Node.Js perform asynchronous operations

*/

/*
    UnderStanding Libuv :
    1. Libuv Written in C language.
    2. Cross-Platform Support for Asynchronous I/O.
    3. Used by Node.Js and Many Other Tools like Luvit, Julia.
    4. Provides Abstraction Over Operating System
    5. Manages Worker Threads for Event Loops
*/

/*
    How Libuv and Node.Js works Together when an I/O request comes in main thread
    1. Hands off Request to Libuv
    2. Libuv places request to queue
    3. Libuv assigns task to worker thread from thread pool
    4. after task is done, worker thread responds o Libuv
    5. Libuv Schedules callback

*/