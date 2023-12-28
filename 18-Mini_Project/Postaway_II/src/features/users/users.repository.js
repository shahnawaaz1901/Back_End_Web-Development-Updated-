import UserModel from "./users.schema.js";
import bcrypt from "bcrypt";
import FriendModel from "../friends/friends.schema.js";
import mongoose from "mongoose";
import ApplicationError from "../error/error.class.js";

export default class UserRepository {
  async newUser(userData) {
    try {
      const { password } = userData;
      const hashPassword = await bcrypt.hash(password, 12);
      userData.password = hashPassword;
      const newUser = new UserModel(userData);
      await newUser.save();
      const friends = new FriendModel({ user: newUser._id });
      await friends.save();
      const afterUpdate = await UserModel.findOneAndUpdate(
        newUser,
        { friends: friends._id },
        { returnDocument: "after" }
      );
      return afterUpdate;
    } catch (error) {
      console.log(mongoose.Error);
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
        { password: hashPassword },
        { returnDocument: "after" }
      );
      return updatedUser;
    } catch (error) {
      console.log(error);
    }
  }

  async storeLoginDetails(userInfo) {
    await UserModel.findOneAndUpdate(
      { email: userInfo.email },
      { $push: { loginDevices: userInfo.token } }
    );
  }

  async signOutAll(userId) {
    console.log(userId);
    return await UserModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(userId),
      },
      {
        $set: { loginDevices: [] },
      },
      { multi: true, returnDocument: "after" }
    );
  }

  async isLoginRequired(id, token) {
    const userLogin = await UserModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
      loginDevices: token,
    });
    if (!userLogin) {
      throw new Error("Login to Continue");
    }
  }

  async updatePassword(updatedPasswordDetail) {
    try {
      const updatedData = await UserModel.findById(
        updatedPasswordDetail.userId
      );
      if (!updatedData) {
        throw new ApplicationError("Something went wrong !!", 500);
      }
      const passwordMatch = await bcrypt.compare(
        updatedPasswordDetail.currentPassword,
        updatedData.password
      );
      if (!passwordMatch) {
        throw new ApplicationError("Password is Incorrect !!", 404);
      }
      updatedData.password = await bcrypt.hash(
        updatedPasswordDetail.updatedPassword,
        12
      );
      await updatedData.save();
      return updatedData;
    } catch (error) {
      console.log(error);
      if (error instanceof ApplicationError) {
        throw new ApplicationError(error.message, error.errStatusCode);
      }
      throw new Error(error.message);
    }
  }
}
