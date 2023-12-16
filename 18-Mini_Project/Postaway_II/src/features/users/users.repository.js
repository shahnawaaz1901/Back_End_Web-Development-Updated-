import mongoose from "mongoose";
import UserModel from "./users.schema.js";
import bcrypt from "bcrypt";

export default class UserRepository {
  async newUser(userData) {
    try {
      const { password } = userData;
      const hashPassword = await bcrypt.hash(password, 12);
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
    console.log(userEmail);
    return await UserModel.findOne({ email: userEmail });
  }

  async userExist(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      console.log(error);
    }
  }

  async changePassword(email, newPassword) {
    try {
      const hashPassword = await bcrypt.hash(newPassword, 12);
      const updatedUser = await UserModel.findOneAndUpdate(
        { email },
        { password: hashPassword }
      );
      return updatedUser;
    } catch (error) {
      console.log(error);
    }
  }
}
