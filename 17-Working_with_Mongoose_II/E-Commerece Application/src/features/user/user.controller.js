import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
// import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import UserRepository from "./user.repository.mongoose.js";
import ApplicationError from "../errorHandler/application.error.js";
import mongoose from "mongoose";
export default class UserController {
  constructor() {
    //* Create userRepository Instance While Creating an Instance
    this.userRepository = new UserRepository();
  }

  //* SignUp
  async signUp(req, res) {
    try {
      const { name, email, password, typeOfUser } = req.body;
      const hashPassword = await bcrypt.hash(password, 12);
      if (password.length < 8) {
        throw new ApplicationError(
          "Password must be greater then 8 Characters",
          406
        );
      }
      const newUser = new UserModel(
        name,
        email,
        // password, //instead of Create Object in Plain password using the hashpassword
        hashPassword, //* HashPassword Instead of Plain text Password
        typeOfUser
      );
      const user = await this.userRepository.signUp(newUser);
      res.status(201).send(user);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).send("Validation failed");
      }

      res.status(error.errorStatusCode).send(error.message);
    }
  }

  //* SignIn
  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      //* Find the UserObject with the email address which user Provides
      const user = await this.userRepository.findByEmail(email);
      if (user) {
        //* if w reach else means user if found by email now compare the password
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          //* Password is Match
          const token = jwt.sign(
            { userId: user._id, email: user.email }, //* Pass Object id and email
            process.env.JWT_Secret,
            { expiresIn: "1h" }
          );
          return res.cookie("token", token).status(200).send(token);
        }
        return res.status(401).send("Please Enter a Valid Password !!");
      }
      return res.status(400).send("Invalid Credentials , Please Try Again!!");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something Went Wrong !!");
    }
  }

  async resetPassword(req, res) {
    try {
      const { newPassword } = req.body;
      const hashPassword = await bcrypt.hash(newPassword, 12);
      const userId = req.userId;
      await this.userRepository.reset(userId, hashPassword);
      res.status(201).send("Password Reset Successfully !!");
    } catch (error) {
      throw new ApplicationError("Something Went Wrong", 500);
    }
  }
}
