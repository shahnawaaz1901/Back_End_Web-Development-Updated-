import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  username: String,
  massage: String,
  timeStamp: { date: String, time: String },
});

export const chatModel = mongoose.model("Chat", chatSchema);
