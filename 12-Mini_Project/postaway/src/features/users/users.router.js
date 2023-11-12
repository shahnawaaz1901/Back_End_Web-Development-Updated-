import express from "express";
import UsersController from "./users.controller.js";

const usersRouter = express.Router();
const usersController = new UsersController();

usersRouter.use("/ragister").post(usersController.signUp);
usersRouter.use("/login").post(usersController.signIn);
usersRouter.use("/logout").get(usersController.signOut);

export default usersRouter;