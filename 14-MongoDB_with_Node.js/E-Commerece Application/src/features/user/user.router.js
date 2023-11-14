import express from "express";
import UserController from "./user.controller.js";

const userController = new UserController();
const userRouter = express.Router();

//* Pass Request to login Controller
userRouter.post("/signin", (req, res) => {
    //* Because if we pass instead of calling then value of this is undefined
  userController.signIn(req, res);
});

//* Pass Request to signup Controller
// userRouter.post("/signup",userController.signUp);

//* Because We Use this keyword on Constructor thats why first we need to pass a callback inside that callback call the main function
userRouter.post("/signup", (req, res) => {
  userController.signUp(req, res);
});

export default userRouter;
