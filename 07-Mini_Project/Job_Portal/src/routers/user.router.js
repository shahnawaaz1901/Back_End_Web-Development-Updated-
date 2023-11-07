import express from 'express';
import UserController from '../controllers/user.controller.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.get("/login",userController.getLogin);
userRouter.get("/logout",userController.logOut);
userRouter.post("/login",userController.loginUser);
userRouter.post("/ragister",userController.ragisterUser);

export default userRouter;