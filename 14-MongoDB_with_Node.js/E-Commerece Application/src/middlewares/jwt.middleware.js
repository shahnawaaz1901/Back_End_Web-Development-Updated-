import jwt from "jsonwebtoken";
const jwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).send("UnAuthorize Access");
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_Secret);
        //* Store User Id for Future to identify the User
        console.log(payload)
        req.userId = payload.userId;
    } catch (error) {
        return res.status(401).send("UnAuthorized User !!");
    }

    next();
};

export default jwtAuth;
