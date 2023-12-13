import mongoose from "mongoose";
import UserRepository from "./users.repository.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    try {
        const newUser = await this.userRepository.newUser(req.body);
        return res.status(201).send(newUser);
    } catch (error) {
        if(error instanceof mongoose.Error){
            res.status(406).send(error.message)
        }
        res.status(404).send("Error While Creating new User");
    }
  }

  signIn(req, res) {}

  signOut(req, res) {}

  signOutAll(req, res) {}
}
