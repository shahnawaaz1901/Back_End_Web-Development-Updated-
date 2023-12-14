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

userRouter.post("/signOut", (req, res) => {
  userController.signOut(req, res);
});

userRouter.post("/singOutAll", (req, res) => {
  userController.signOutAll(req, res);
});

export default userRouter;
