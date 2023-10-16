import UserController from "../controllers/user.controller.js";
export const auth = (req, res, next) => {
    if(req.session.userEmail){
        next();
    }else{
        res.redirect("/login");
    }
};
