/*
    As We Know that JavaScript has a Single Thread Language
*/
/* Block Statement : Means both Console Statement Prints After Loop is Over Because 
            Single Thread Means first Loop is executed not take care how important 
            and how many time it takes Both Print Statement trigerred After the loop. Like :
*/
for(let i = 0; i < 100000000;i++){
    // Just for Consuming time
}

console.log('Print After the Loop');

console.log('I Have to Wait Longer to Complete the Loop :(');

/*
    Non Blocking Statement : Means JavaScript Engine Not Wait to Complete First Statement
                    If First Statement Consume time then is Will Goes for Next Statement.
                    This All Done Because of Asynchronous Behaviour of JavaScript. Which
                    We Learn in Vanilla JavaScript that setTimeOut Function is Goes for
                    Task Queue And Event Loop put it Into Execution Stack After All 
                    Statement is Executed
*/

setTimeout(()=>{
    console.log('Print After 8 Seconds');
},8000);

console.log('Print Statement After SetTimeOut');

/*
Blocking code

Which of the following code implementations is a blocking piece of code? ( Multiple )

A)
console.log('Start');
setTimeout(()=>{
    console.log('Inside the SetTimeOut')
},0)
while(true){
    console.log('Inside the While Loop')
};
console.log('End');

B) 
const compute = ()=>{
    let sum = 0;
    for(let i = 0; i < 1000000;i++){
        sum += i;
    }
    console.log(sum);
}
setTimeout(compute, 0);
console.log('Done !!');

C) 
let i = 0;
setInterval(()=>{
    i++;
    console.log(i)
},1000);
console.log(i);
D) 
const idle = (ms)=>{
    let start = new Date().getTime();
    while(new Date().getTIme() < start + ms){}
}
console.log('Start');
idle(1000);
console.log('End');

1. A                        // Correct
2. B
3. C
4. D                        // Correct

Solution Description : The code snippets a and d demonstrate blocking behavior. 
                In option a, due to the infinite while loop, the callback function 
                is only executed once when the loop is terminated, which never happens. 
                In option d, the idle function blocks the program for a specified amount 
                of time before continuing. The other code snippets use non-blocking 
                techniques with setTimeout and setInterval to allow the program to continue
                executing while functions run asynchronously.
*/