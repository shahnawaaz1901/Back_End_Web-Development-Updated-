import UserModel from "./users.schema.js";
import bcrypt from "bcrypt";
import FriendModel from "../friends/friends.schema.js";
import mongoose from "mongoose";
import ApplicationError from "../error/error.class.js";

export default class UserRepository {
  //* Add New User
  async newUser(userData) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const { password } = userData;
      const hashPassword = await bcrypt.hash(password, 12);
      userData.password = hashPassword;
      const newUser = new UserModel(userData);
      const friends = new FriendModel({ user: newUser._id });
      newUser.friends = friends._id;
      friends.user = newUser._id;
      await newUser.save({ session });
      await friends.save({ session });
      await session.commitTransaction();
      await session.endSession();
      return newUser;
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      console.log(error);
      if (error instanceof mongoose.Error.ValidationError) {
        throw new ApplicationError(error.message, 406);
      }
      throw error;
    }
  }

  //* Find Account By Email
  async userExist(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  //* Change Password
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
      throw error;
    }
  }

  //* Store Every Login History
  async storeLoginDetails(userInfo) {
    try {
      await UserModel.findOneAndUpdate(
        { email: userInfo.email },
        { $push: { loginDevices: userInfo.token } }
      );
    } catch (error) {
      throw error;
    }
  }

  //* SignOut User
  async signOut(userObj) {
    try {
      await UserModel.findByIdAndUpdate(userObj.userId, {
        $pull: {
          loginDevices: userObj.JWT_Token,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  //* SignOut from All Devices
  async signOutAll(userId) {
    try {
      return await UserModel.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(userId),
        },
        {
          $set: { loginDevices: [] },
        },
        { multi: true, returnDocument: "after" }
      );
    } catch (error) {
      throw error;
    }
  }

  //* Check if User use SignOutAll to Logout from All Devices
  async isLoginRequired(id, token) {
    try {
      const userLogin = await UserModel.findOne({
        _id: new mongoose.Types.ObjectId(id),
        loginDevices: token,
      });
      if (!userLogin) {
        throw new Error("Login to Continue");
      }
    } catch (error) {
      throw error;
    }
  }

  //* Change the Password using the Existing Password
  async updatePassword(updatedPasswordDetail) {
    try {
      const updatedData = await UserModel.findById(
        updatedPasswordDetail.userId
      );
      if (!updatedData) {
        throw new ApplicationError("User not found !!", 404);
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
      throw error;
    }
  }
}
