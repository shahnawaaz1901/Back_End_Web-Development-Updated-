import UserModel from "./user.model.js"
import jwt from "jsonwebtoken";
export default class UserController{

    //* SignUp
    signUp(req, res){
        const {name, email, password, typeOfUser} = req.body;
        UserModel.signUp(name, email, password, typeOfUser);
        res.status(201).send("User Created Successfully !!");    
    }

    //* SignIn
    signIn(req, res){
        const {email, password} = req.body;
        const result = UserModel.signIn(email, password);
        if(!result){
            res.status(400).send("Invalid Credentials , Please Try Again!!");
        }else{
            const token = jwt.sign({userId : result.id, email : result.email},"2PLVo2mvL3BGWhcSlfbL",{expiresIn : "1h"});
            res.status(200).send(token);
        }
    }
}