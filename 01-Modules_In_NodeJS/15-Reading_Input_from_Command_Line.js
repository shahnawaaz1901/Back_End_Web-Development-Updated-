/*
    We Take Input From the User in terminal in Other language like c++ and java
    How Can we Take Input from the user in js.
*/

/*
    Node.Js has Saprate Module for that called readline which is part of ecosystem
    of Node.Js
*/
// 1. Import readline Module 
const { stdin, stdout } = require('process');
const readLine = require('readline');

// 2. configure Interface to Connect Appication and Terminal
const interface = readLine.createInterface({                  // Return an Interface
    input : process.stdin,                 // Process Belong to Node.Js System which Interact with OS
    output : stdout
})

// 3. Reading Value from Interface
/* 
    In interface.question function whatever string you passed it's show on terminal
    and whatever number user insert it's store in num1 variable in string form.
    Because User give input anything which is stores in string form in callback argument
*/
interface.question('Enter the First Number : ',function(num1){
    interface.question('Enter the Second Number : ',function(num2){
        let first = Number(num1);                       // Convert String to Number
        let second = Number(num2);                      // Convert String to Number
        console.log('Sum of Both Number is : ', first + second);

    })
})