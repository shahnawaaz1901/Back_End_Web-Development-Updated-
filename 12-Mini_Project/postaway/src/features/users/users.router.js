import express from "express";
import UsersController from "./users.controller.js";

const usersRouter = express.Router();
const usersController = new UsersController();

usersRouter.post("/ragister",usersController.signUp);
usersRouter.post("/login",usersController.signIn);
usersRouter.get("/logout",usersController.signOut);

export default usersRouter;