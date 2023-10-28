import jwt from "jsonwebtoken";
const jwtAuth = (req, res, next) => {
    //1. Step : Read the Token

    const token = req.headers["authorization"];
    //2. Step : If No Token Return the Error
    if(!token){
        return res.status(401).send("UnAuthorize Access");
    }
    //3. Step : If Token is Present Check Token is Valid or Not
    try {
        //* For Verify the token we need to pass the key along with token 
        //* Key is which we have pass while generating the token
        const payload = jwt.verify(token, "2PLVo2mvL3BGWhcSlfbL");
        console.log(payload);
        //* verify Function Returns the payload which we pass while we generating the token
        //* Along with the Detail Payload Also Contains the Creation and Expire time
    } catch (error) {
        //* This Error Will be thrown if token is expired or Someone Modify the Token
        return res.status(401).send("UnAuthorized User !!");
    }

    //4. Step : If Token is Valid then Call next Function
    next();
};

export default jwtAuth;
