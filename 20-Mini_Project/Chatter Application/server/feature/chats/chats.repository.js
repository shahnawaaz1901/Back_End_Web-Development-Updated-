import ChatModel from "./chats.schema.js";
export default class ChatRepository {
  //* Store Every New Message
  async storeMessage(message) {
    const newMessage = new ChatModel(message);
    await newMessage.save();
  }

  //* Get Privous Chats
  async retrieveMessage() {
    return await ChatModel.find().sort({ time: 1 });
  }

  //* Delete All Chats
  async deleteAll() {
    await ChatModel.deleteMany();
  }
}
