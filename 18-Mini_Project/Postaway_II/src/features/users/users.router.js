import express from "express";
import UserController from "./users.controller.js";

const userRouter = express.Router();
const userController = new UserController();

//* Signup User
userRouter.post("/signUp", (req, res) => {
  userController.signUp(req, res);
});

//* Signin User
userRouter.post("/signIn", (req, res) => {
  userController.signIn(req, res);
});

userRouter.get("/forgetPassword/sendOtp/:email", (req, res) => {
  userController.sendOtp(req, res);
});

userRouter.put("/forgetPassword/validateOtp/:email", (req, res) => {
  userController.validateAndResetPassword(req, res);
});
export default userRouter;
