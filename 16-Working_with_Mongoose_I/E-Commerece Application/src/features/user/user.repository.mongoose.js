import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import ApplicationError from "../errorHandler/application.error.js";

/* 
    Model Functionn takes two argument first name of the collection 
    and next is the Schema, we can create schema here or we can import 
    the schema
*/
const UserModel = mongoose.model("users", userSchema);
export default class UserRepository {
  //* Member Functions
  async signUp(user) {
    try {
      // Create Instance of UserModel
      const newUser = new UserModel(user);
      await newUser.save(); // Insert the Data into the database
      return newUser; // Return the Data
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong", 500);
    }
  }
  async signin(email, password) {
    try {
      /* 
            With mongoose we have four functions to retreive the data find,
            findById, findOne and where
        */
      return await UserModel.findOne({ email, password });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong", 500);
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something Went Wrong", 500);
    }
  }
}
