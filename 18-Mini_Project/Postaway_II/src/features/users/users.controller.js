import mongoose from "mongoose";
import UserRepository from "./users.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendNotification from "../notification/alert.nodemailer.js";


export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    try {
      const newUser = await this.userRepository.newUser(req.body);
      return res.status(201).send(newUser);
    } catch (error) {
      console.log(error);
      if (error instanceof mongoose.Error) {
        res.status(406).send(error.message);
      }
      res.status(404).send("Error While Creating new User");
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.userRepository.existingUser(req.body);
      if (result) {
        const isMatch = await bcrypt.compare(password, result.password);
        if (isMatch) {
          const token = jwt.sign(
            { email: result.email, _id: result._id },
            process.env.SECRETKEY
          );
          return res.status(200).send(token);
        }
        sendNotification(isMatch.email, "Incorrect_Pass");
        return res.status(401).send("Password is Incorrect !");
      }
      return res.status(404).send("Invalid Credentials !");
    } catch (error) {}
  }

  signOut(req, res) {}

  signOutAll(req, res) {}
}
