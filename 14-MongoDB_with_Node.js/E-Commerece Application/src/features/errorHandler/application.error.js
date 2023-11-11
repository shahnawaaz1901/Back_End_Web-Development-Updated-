/* 
    We Create Our own Application Level Class Which Extends to Error Class Which
    preDefine Class in JavaScript But Problem in Error Class is Error Class Only
    Contains the message but we also Need the Status code for Our Application
    Level Error
*/
export default class ApplicationError extends Error{

    constructor(errorMassage, errorStatusCode){
        /* 
            Because We Need to First Called the Constructor of Class Which We Use
            to Extend so we called error class using super keyword and after that 
            keyword we save errorSatusCode in Our Class   
        */
        super(errorMassage);
        this.errorStatusCode = errorStatusCode;
    }
}