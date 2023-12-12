import mongoose from "mongoose";

export const connect = async () => {
    await mongoose.connect("mongodb+srv://shahnawaaz1901:A5FFC976%40ybl@cluster0.eedd7pm.mongodb.net/ChatDB",{
        useNewUrlParser : true,
        useUnifiedTopology : true
    });
    console.log("DB is Connected via  Mongoose")
};
