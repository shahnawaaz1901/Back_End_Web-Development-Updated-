import mongoose from "mongoose";
import UserRepository from "./users.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendOtp from "../notification/otp.js";
import OTPGenerator from "../verification/otp.verification.js";
import wrongPasswordAlert from "../notification/wrongPassword.js";
import updatePasswordAlert from "../notification/updatePassword.js";
import ApplicationError from "../error/error.class.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  //* Create New Account
  async signUp(req, res, next) {
    try {
      if (req.file) {
        req.body.profileImageURL = req.file.filename;
      }
      const newUser = await this.userRepository.newUser(req.body);
      return res.status(201).json({ success: true, user: newUser });
    } catch (error) {
      next(error);
      // res.status(500).json({ success: false, message: "Something went wrong" });
    }
  }

  //* SignIn to Existing Account
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await this.userRepository.userExist(email);
      if (result) {
        const isMatch = await bcrypt.compare(password, result.password);
        if (isMatch) {
          const token = jwt.sign(
            { email: result.email, _id: result._id },
            process.env.SECRET_KEY
          );
          await this.userRepository.storeLoginDetails({
            email: result.email,
            token,
          });
          res.cookie("JWT_Token", token);
          return res.status(200).json({ success: true, token });
        }
        wrongPasswordAlert(result.email);
        throw new ApplicationError("Password is Incorrect !", 401);
      }
      throw new ApplicationError("Invalid Credentials", 404);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async signOut(req, res, next) {
    try {
      const { userId } = req;
      const { JWT_Token } = req.cookies;
      await this.userRepository.signOut({ userId, JWT_Token });
      res
        .clearCookie("JWT_Token")
        .status(200)
        .json({ success: true, message: "SignOut Successfully !!" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //* SentOTP for Reset the Password
  async sendOtp(req, res, next) {
    try {
      const { email } = req.params;
      if (!email) {
        throw new ApplicationError("Please Enter Email Address", 404);
      }
      const userExist = await this.userRepository.userExist(email);
      if (userExist) {
        await sendOtp(email, userExist.name);
        return res
          .status(200)
          .json({ success: true, message: "Otp sent successfully !" });
      }
      throw new ApplicationError("Account Not Exist with this Email !", 404);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //* Validate OTP and Reset the Password
  async validateAndResetPassword(req, res, next) {
    try {
      const { email } = req.params;
      const { password, otp } = req.body;
      if (!password) {
        throw new ApplicationError("Password Can't Be Empty !", 406);
      }

      const verified = OTPGenerator.validateOTP(otp, email);
      if (verified.success) {
        let updatedData = await this.userRepository.changePassword(
          email,
          password
        );
        await updatePasswordAlert(email, updatedData.name);
        return res.status(200).json({ success: true, user: updatedData });
      }
      throw new ApplicationError(verified.msg, 404);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //* SignOut from All Devices
  async signOutAll(req, res, next) {
    try {
      const { userId } = req;
      await this.userRepository.signOutAll(userId);
      return res
        .status(200)
        .json({ success: true, message: "SingOut From All Devices !!" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //* Change Password using Existing Password & Login
  async changePassword(req, res, next) {
    try {
      const { userId } = req;
      const { currentPassword, updatedPassword } = req.body;
      const update = await this.userRepository.updatePassword({
        userId,
        currentPassword,
        updatedPassword,
      });
      res.status(200).json({ success: true, user: update });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
