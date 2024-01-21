import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}/ChatApp`);
    console.log("Database is Connected Via Mongoose");
  } catch (error) {
    console.log("Error while Connecting with Database");
  }
};

export default connectToDB;
