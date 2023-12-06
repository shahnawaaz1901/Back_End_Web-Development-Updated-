import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  username: String,
  massage: String,
  timeStamp: String,
});

export const chatModel = mongoose.model("Chat", chatSchema);
