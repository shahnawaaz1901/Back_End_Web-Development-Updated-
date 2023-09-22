function grandTotal(productsList){
    let total = 0;
    productsList.forEach((product) => {
        total += product.price * product.quantity; 
    });
    return total;
}

function printTotal(total){
    console.log(total);
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
printTotal(total);

/*
    For Debugging in VS Code We Need to First Create launch.json file which
    contains information regarding our file. and then run debugger and you can 
    see many options to debug your code
*/

