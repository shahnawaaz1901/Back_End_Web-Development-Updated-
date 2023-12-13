import mongoose from "mongoose";

const connectToDB = async ()=>{
    try {
        await mongoose.connect(
          "mongodb+srv://shahnawaaz1901:A5FFC976%40ybl@cluster0.eedd7pm.mongodb.net/PostAway"
        );
        
        console.log("Database is Connected Via Mongoose");
    } catch (error) {
        console.log("Something went wrong while Connecting with Database");
    }
}

export default connectToDB;