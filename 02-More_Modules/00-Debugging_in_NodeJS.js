/*
    Why Debugging :
    1. UnderStand Why Your Code Not Work As Expected
    2. Improve the Quality and Realiability of Our Application
    3. Learn From Our Mistakes and become Better Developer
*/


// Lets Debug a Code Using Debugger
function grandTotal(productsList){
    let total = 0;
    productsList.forEach((product) => {
        total += product.price * product.quantity; 
    });
    return total;
}

let productsList = [
    {
        name : 'Hat',
        price : 25,
        quantity : 2
    },
    {
        name : 'Shoe',
        price : 50,
        quantity : 3
    },
    {
        name : 'Gloves',
        price : 30,
        quantity : 2
    }

]
let total = grandTotal(productsList);
console.log(`Total Price is : ${total}`);

/*
    Debug Process : 
    Start Debugger Using : node inspect file_name.js
    Debugger points to first statment which is in global context, here line 18 
    is first statement of global context

    To Set Debugger to a specific line where main calculation is done or where
    main work of function is done, then we need to set breakpoint to that line
    Using function : setBreakpoint('file_name.js','line_number')

    For Inside forEach we can check what would be happen after first iteration or
    what is the value of total after first iteration is completed 
    Using function : watch('name_of_each_data_of_array(here product is each data)')

    To back or previous point Use Function : Cont
    cont continue the debugger and send debugger to previous point
    
    using watch and after that cont we can check each iteration

*/