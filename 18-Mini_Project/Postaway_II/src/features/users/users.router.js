import express from "express";
import UserController from "./users.controller.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/signUp", userController.signUp);
userRouter.post("/signIn", userController.signIn);
userRouter.post("/signOut", userController.signOut);
userRouter.post("/singOutAll", userController.signOutAll);

export default userRouter;
