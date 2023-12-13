import mongoose from "mongoose";

const connectToDB = async ()=>{
    try {
        await mongoose.connect(
          `${process.env.DB_URL}/PostAway`
        );
        
        console.log("Database is Connected Via Mongoose");
    } catch (error) {
        console.log("Something went wrong while Connecting with Database");
    }
}

export default connectToDB;