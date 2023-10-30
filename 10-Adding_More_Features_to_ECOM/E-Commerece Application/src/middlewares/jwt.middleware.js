import jwt from "jsonwebtoken";
const jwtAuth = (req, res, next) => {
    const token = req.headers["authorization"];
    if(!token){
        return res.status(401).send("UnAuthorize Access");
    }
    try {
        const payload = jwt.verify(token, "2PLVo2mvL3BGWhcSlfbL");
    } catch (error) {
        return res.status(401).send("UnAuthorized User !!");
    }

    next();
};

export default jwtAuth;
