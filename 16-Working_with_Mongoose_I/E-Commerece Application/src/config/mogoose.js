import mongoose from "mongoose";
import "../../env.js";
const url = process.env.DB_URL;
export const connenctUsingMongoose = async () => {
  /* 
    Connect function takes arguments first is string and another one
    is Optional arguments which use to connect latest mongoose server
    */

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Datbase Connected Via Mongoose");
  } catch (error) {
    console.log("Error While Connecting with Database !!");
  }
};
