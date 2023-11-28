import ProductModel from "../features/products/product.model.js";
import UserModel from "../features/user/user.model.js";
const basicAuthorizer = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if(!authHeader){                        //* If authHeader is Undefined that means user not pass email password for authorization in that case we Not Allow User to Access the Products
        return res.status(401).send("UnAuthorized Access !!");         
    }
    console.log(authHeader);
    const base64Credentials = authHeader.replace('Basic','');
    console.log(base64Credentials);

    const decodeData = Buffer.from(base64Credentials , 'base64').toString('utf8');
    const actualData = decodeData.split(':');
    const allUser = UserModel.getAllUserDetails().find((u)=> u.email == actualData[0] && u.password == actualData[1]);
    if(!allUser){
        res.status(400).send("Invalid Credentials !!");
    }else{
        next();
    }
};

export default basicAuthorizer;