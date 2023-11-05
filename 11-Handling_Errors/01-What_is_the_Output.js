/* 
Hnadling the Situation

In a product Conroller, a function is calling another function inside
the model that might throw an error. How can you handle this situation.?


1. Use the try-catch block in the product controller function.      //* Correct
2. Use the try-catch block in the model function.
3. Use a switch statement to handle errors.
4. Implement logging to capture errors.

Solution Description : To Handle errors that might occur in a function called from 
                another function, you can use try-catch block in the function (product 
                controller). This way, any error thrown by the model function can be
                caught and handled in the controller.
*/

/*
Information in catch block

What Information does the catch block receive when an error occurs.?


1. The error message only.
2. The error object containing the error message, name, and stack.              //* Correct
3. The error name and message.
4. The custom error class created using the throw keyword.
*/