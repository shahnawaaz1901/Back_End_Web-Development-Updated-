import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const { DB_URL } = process.env;
    await mongoose.connect(`${DB_URL}/JobPortal`);
    console.log("Database is Connected via Mongoose !!");
  } catch (error) {
    console.log("Error While Connecting with Database");
  }
};

export default connectToDB;
