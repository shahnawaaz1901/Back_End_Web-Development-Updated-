import UserModel from "./user.model.js";
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
            res.status(400).send("Invalid Credentials !!");
        }else{
            res.status(200).send("SignIn Successfully !!");
        }
    }
}