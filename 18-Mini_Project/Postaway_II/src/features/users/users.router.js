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
userRouter.post("/signOut", userController.signOut);
userRouter.post("/singOutAll", userController.signOutAll);

export default userRouter;
