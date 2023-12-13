import mongoose from "mongoose";
import UserModel from "./users.schema.js";
import bcrypt from "bcrypt";

export default class UserRepository {
  async newUser(userData) {
    try {
      const { password } = userData;
      const hashPassword = await bcrypt.hash(password, 12);
      console.log(hashPassword);
      userData.password = hashPassword;
      const newUser = new UserModel(userData);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  async existingUser() {}

  logOutUser() {}
}
