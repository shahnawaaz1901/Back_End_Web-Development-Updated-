import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});
const ChatModel = mongoose.model("Chat", chatSchema);
export default ChatModel;
