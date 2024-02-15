import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const url = process.env.DB_URL;
    await mongoose.connect(`${url}/JobPortal`);
    console.log("Database is Connected Via Mongoose !!");
  } catch (error) {
    console.log("Error While Connecting with Database");
  }
};

export default connectToDB;
