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

userRouter.get("/forgetPassword/:email", (req, res) => {
  userController.forgotPassword(req, res);
});

userRouter.put("/validateOtp/:email", (req, res) => {
  userController.changePassword(req, res);
});
export default userRouter;
