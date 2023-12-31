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
  (req, res) => {
    userController.signUp(req, res);
  }
);

//* Signin User
userRouter.post("/signIn", (req, res) => {
  userController.signIn(req, res);
});

//* SignOut
userRouter.delete("/signOut", auth, (req, res) => {
  userController.signOut(req, res);
});

//* SendOTP for Reset the Password
userRouter.get("/forgetPassword/sendOtp/:email", (req, res) => {
  userController.sendOtp(req, res);
});

//* Validate OTP and Reset the Password
userRouter.put("/forgetPassword/validateOtp/:email", (req, res) => {
  userController.validateAndResetPassword(req, res);
});

//* SignOut from All Devices
userRouter.delete("/signOutAll", auth, (req, res) => {
  userController.signOutAll(req, res);
});

//* Change Password using Existing Password
userRouter.post("/changePassword", auth, (req, res) => {
  userController.changePassword(req, res);
});
export default userRouter;
