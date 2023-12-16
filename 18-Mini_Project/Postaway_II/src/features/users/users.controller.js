import mongoose from "mongoose";
import UserRepository from "./users.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendOtp from "../notification/otp.js";
import OTPGenerator from "../verification/otp.verification.js";
import wrongPasswordAlert from "../notification/wrongPassword.js";
import updatePasswordAlert from "../notification/updatePassword.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(req, res) {
    try {
      const newUser = await this.userRepository.newUser(req.body);
      return res.status(201).send(newUser);
    } catch (error) {
      if (error instanceof mongoose.Error) {
        res.status(406).send(error.message);
      }
      res.status(404).send("Error While Creating new User");
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.userRepository.existingUser(email);
      if (result) {
        const isMatch = await bcrypt.compare(password, result.password);
        if (isMatch) {
          const token = jwt.sign(
            { email: result.email, _id: result._id },
            process.env.SECRETKEY
          );
          res.cookie("JWT_Token", token);
          return res.status(200).send(token);
        }
        wrongPasswordAlert(result.email);
        return res.status(401).send("Password is Incorrect !");
      }
      return res.status(404).send("Invalid Credentials !");
    } catch (error) {
      res.status(404).send("Something Went Wrong while Logging");
    }
  }

  async sendOtp(req, res) {
    try {
      const { email } = req.params;
      if (!email) {
        res.status(404).send("Please Enter Email Address");
      }
      const userExist = await this.userRepository.userExist(email);
      if (userExist) {
        await sendOtp(email);
        return res.status(200).send("Otp sent successfully !");
      }
      res.status(404).send("Account Not Exist with this Email !");
    } catch (error) {
      res.status(500).send("Something went wrong while sending Otp!");
    }
  }

  async validateAndResetPassword(req, res) {
    try {
      const { email } = req.params;
      const { password, otp } = req.body;
      if (!password || !otp) {
        return res.status(500).send("Something went Wrong !");
      }
      if (OTPGenerator.validateOTP(otp, email)) {
        const updatedData = await this.userRepository.changePassword(
          email,
          password
        );
        await updatePasswordAlert(email);
        return res.status(200).send("Password Updated Successfully !");
      }
      return res.status(206).send("OTP is incorrect !!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error while Changing OTP");
    }
  }
}
