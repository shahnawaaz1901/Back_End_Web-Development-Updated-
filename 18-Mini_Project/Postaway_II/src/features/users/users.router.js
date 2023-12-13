import express from "express";
import UserController from "./users.controller.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/signUp", userController.signup);
userRouter.post("/signIn", userController.signin);
userRouter.post("/signOut", userController.signout);

export default userRouter;