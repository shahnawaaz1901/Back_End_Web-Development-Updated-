import express from "express";
import UserController from "./users.controller.js";
import auth from "../../middlewares/jwt.auth.js";
import upload from "../../middlewares/multer.fileUpload.js";
import filePath from "../../middlewares/setPath.middleware.js";
const userRouter = express.Router();
const userController = new UserController();

//* Signup User
userRouter.post(
  "/signUp",
  filePath,
  upload.single("profileImageURL"),
  (req, res, next) => {
    userController.signUp(req, res, next);
  }
);

//* Signin User
userRouter.post("/signIn", (req, res, next) => {
  userController.signIn(req, res, next);
});

//* SignOut
userRouter.delete("/signOut", auth, (req, res, next) => {
  userController.signOut(req, res, next);
});

//* SendOTP for Reset the Password
userRouter.get("/forgetPassword/sendOtp/:email", (req, res, next) => {
  userController.sendOtp(req, res, next);
});

//* Validate OTP and Reset the Password
userRouter.put("/forgetPassword/validateOtp/:email", (req, res, next) => {
  userController.validateAndResetPassword(req, res, next);
});

//* SignOut from All Devices
userRouter.delete("/signOutAll", auth, (req, res, next) => {
  userController.signOutAll(req, res, next);
});

//* Change Password using Existing Password
userRouter.post("/changePassword", auth, (req, res, next) => {
  userController.changePassword(req, res, next);
});
export default userRouter;
