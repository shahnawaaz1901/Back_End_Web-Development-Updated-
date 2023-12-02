import express from "express";
import UsersController from "./users.controller.js";

const usersRouter = express.Router();
const usersController = new UsersController();

usersRouter.post("/signup", usersController.signUp);
usersRouter.post("/signin", usersController.signIn);

export default usersRouter;
