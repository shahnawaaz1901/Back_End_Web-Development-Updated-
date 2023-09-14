/*
I/O in Node.js

Which of the following statements is true regarding I/O operations in Node.js?

1. I/O operations are handled by the main thread only.
2. I/O operations are handled in the background by a thread from the thread pool.
3. I/O operations are handled in the background by the Event Loop
4. I/O operations are always handled synchronously.

Solution Description : Option b is correct because the extra thread from thread pool 
                    in Node.js handle I/O operations in the background and add callback 
                    functions to the Event queue, allowing the main thread to continue 
                    executing other tasks. This approach enables Node.js to handle the 
                    result of the I/O operation asynchronously.
*/


/*
Working of Nodejs

Which statement about Node.js processing incoming requests and executing tasks is correct?

1. Node.js adds incoming requests to the event queue and utilizes additional threads 
for certain tasks such as I/O operations and executing asynchronous tasks.

2. The main thread of Node.js manages the event loop and assigns the next task in the 
event queue to itself after determining whether the task is synchronous or asynchronous.

3. Node.js employs a pool of threads to handle asynchronous tasks, allowing parallel 
execution without blocking the main thread and increasing server efficiency.

4. The main thread delegates synchronous and time-consuming tasks to the Node.js runtime 
to prevent blocking and enable the main thread to continue handling incoming requests.
*/