import ProductModel from "../features/products/product.model.js";
import UserModel from "../features/user/user.model.js";
const basicAuthorizer = (req, res, next) => {
    /* 
        This Authorizer Not Like a session Because in session server gives
        a session id to the user which user can use to authenticate along 
        with every request. But in this authorizer because REST API is independent
        for platform so that in REST API view is independent that's why for
        authentication we use authentic email password along with every request
        in request header  
    */

    //1.Step : Check User Header is Empty or Not
    /* 
        WE Can Access http Header using req.headers where all http header is present but
        We require only authorization headers so we need to pass that authorization header
    */
    const authHeader = req.headers["authorization"];
    /*
        If User Not Pass basic email and password details in http headers 
        along with request then req.headers["authorization"] is undefined
    */
    //* Check if authHeader is undefined
    if(!authHeader){                        //* If authHeader is Undefined that means user not pass email password for authorization in that case we Not Allow User to Access the Products
        return res.status(401).send("UnAuthorized Access !!");         
    }
    console.log(authHeader);
    //2.Step : If Authorization Header is Present
    /*
        If Authorization Header if Credentials is Present then We Need to 
        Extract that credentials because credentials is encoded in format
        called base64 which is very popular encoding technique for Encode
        the Headers
    */
    //* 'basic' key word B is UpperCase So Stay Safe
    const base64Credentials = authHeader.replace('Basic','');
    /*
        Because before the encoded data a 'basic' keyword is written
        so we dont need that 'basic' keyword because we Only Need the
        encoded data so we replace that 'basic' word to an empty string 
    */
    console.log(base64Credentials);

    //3.Step : Decode the base64 encoded data
    const decodeData = Buffer.from(base64Credentials , 'base64').toString('utf8');
    /* 
        Buffer.from function create buffer for base64Credentials so we need to
        Pass the encoded format which which encoding format base64Credentials is
        as name suggest base64Credentials in base64 so we pass base64 along with
        encoded data and convert it into the String
    */
    console.log(decodeData);

    //* Split the decode data with colon
    /* 
        split function convert string into array in that array where array element
        is the seprate By Colon in String
    */
    const actualData = decodeData.split(':');
    console.log(actualData);
    const allUser = UserModel.getAllUserDetails().find((u)=> u.email == actualData[0] && u.password == actualData[1]);
    if(!allUser){
        res.status(400).send("Invalid Credentials !!");
    }else{
        next();
    }
};

export default basicAuthorizer;