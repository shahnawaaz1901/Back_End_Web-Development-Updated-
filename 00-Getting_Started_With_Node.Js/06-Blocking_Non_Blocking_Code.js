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
