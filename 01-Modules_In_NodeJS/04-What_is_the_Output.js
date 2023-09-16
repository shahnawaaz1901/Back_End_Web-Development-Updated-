/*
Exporting ES6 module

What is/are the correct way(s) to export a function in ES6 module syntax?(Multiple)

A)
export const function_nam = ()=>{
    Function Body
}

B)
const function_name = ()=>{
    Function Body
}
export function_name

C)
const function_name = ()=>{
    Function Body
}
export {function_name};

D)
export function_name = ()=>{
    Function Body
}

1. A                                // Correct
2. B
3. C                                // Correct
4. D

Solution Description : Option (a) creates a named export using export const 
                    function_name = () => {...}, while option (c) defines the 
                    function as a property of an object using export { function_name }. 
                    This approach allows multiple functions to be exported from a single 
                    module by adding them as properties of the same object.
*/