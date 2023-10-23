/*
Reasons for Avoiding MVC Pattern

You're creating a framework that allows users to build their own unique interfaces. 
Why might you avoid the MVC pattern for this project?

1. MVC pattern provides limited scope for customization.
2. Tight coupling in MVC reduces component reusability.         //*Correct
3. MVC pattern makes the user interface less intuitive.
4. MVC pattern reduces the efficiency of data handling.

Solution Description : The MVC pattern often leads to tight coupling between 
                views and controllers, reducing their reusability. This could 
                limit flexibility and customization, key requirements in a 
                scenario where unique interfaces are being created.

*/

/*
API-Based Approach over MVC Pattern

You're building a travel booking application that needs to integrate with 
multiple external systems for flight details, hotel information, and weather 
forecasts. Why might an API-based approach be more suitable than the MVC pattern?(multiple)

1. APIs enable seamless integration with diverse external systems           //*Correct
    regardless of client implementations.
2. APIs provide cross-platform compatibility, serving data to web,          //*Correct
    mobile, and IoT devices.
3. APIs aim for loose coupling to ensure flexibility, reusability,          //*Correct
    and ease of integration.
4. APIs guarantee faster response times compared to the MVC pattern.

Solution Description : APIs do not inherently guarantee faster response times. 
                    Response times depend on various factors, including implementation 
                    details, network conditions, and server performance, rather than the 
                    architectural choice itself.
*/

/*
REST, SOAP, and GraphQL

What are REST, SOAP, and GraphQL?

1. JavaScript frameworks for backend API development.
2. Network protocols for backend API communication.
3. Programming languages for backend API implementation.
4. API protocols for backend API construction.                          //*Correct

Solution Description : REST, SOAP, and GraphQL serve as API protocols for 
                    constructing backend APIs. They establish the guidelines 
                    and standards for communication between clients and servers, 
                    facilitating data exchange and interoperability.
*/