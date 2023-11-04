import express from 'express';
import UserController from './user.controller.js';

const userController = new UserController();
const userRouter = express.Router();

//* Pass Request to login Controller
userRouter.post("/login",userController.signIn);

//* Pass Request to signup Controller
userRouter.post("/signup",userController.signUp);

export default userRouter;