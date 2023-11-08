/*
Vunerability with Arrays

Consider the following Code Snippet in a Node.js Applicaton

let users = [
    { id : 1, name: "John Doe", email: "johndoe@example.com"},
    { id : 2, name: "John Doe", email: "johndoe@example.com"},
]

The Application uses an array named 'users' to store user data obtained 
from the Node.Js server. What vulnerability does this approach have .?


1. The application cannot add more data to the 'users' array.
2. The application cannot handle different types of data.
3. The data stored in the 'users' array will be lost if the server restarts     //* Correct
    or there's a power loss.                    
4. The application cannot secure access to the 'users' array.

Solution Description : The Current Implementation does not inherently prevent 
                adding more data to the 'users' array, handling different data 
                types or securing access to the 'users' array. The key vulnerability 
                is the non-persistence of in memory data, leading to potenstial 
                data loss on server restarts or power loss.
*/

/*
File System vs Databse

Your Company has a system where all customer data, including comments, 
transaction details, and personal data, are stored in plain text files. 
As a backend developer, you recognize the issue with this approach. 
Which of the following reasons would prompt you to propose a move from 
the file system to a database ( Multiple )


1. Files cannot store different types of data.
2. File systems provide poor support for data management.           //* Correct
3. File systems are difficult to scale with large amounts of data.  //* Correct
4. File systems are not optimized for fast data retrieval.          //* Correct

Soltution Description : File System struggle with managing large volumes of data, 
                scalling adequately, and ensuring efficient data retrieval. These 
                limitations make databases a superior alternative for data storage 
                and management
*/