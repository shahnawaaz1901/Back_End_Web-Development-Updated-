import mongoose from "mongoose";
import UserModel from "./users.schema.js";
import bcrypt from "bcrypt";

export default class UserRepository {
  async newUser(userData) {
    try {
      const { password } = userData;
      console.log(password);
      const hashPassword = await bcrypt.hash(password, 12);
      console.log(hashPassword);
      userData.password = hashPassword;
      const newUser = new UserModel(userData);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async existingUser(userEmail) {
    return await UserModel.findOne({ email: userEmail });
  }

  async userExist(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      console.log(error);
    }
  }
}
