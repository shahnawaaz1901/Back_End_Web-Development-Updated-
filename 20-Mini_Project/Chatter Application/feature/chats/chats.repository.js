import ChatModel from "./chats.schema.js";
export default class ChatRepository {
  //* Store Every New Message
  async storeMessage(message) {
    const newMessage = new ChatModel(message);
    await newMessage.save();
  }

  async retrieveMessage() {
    return await ChatModel.find().limit(50).sort({ time: 1 });
  }

  async deleteAll() {
    await ChatModel.deleteMany();
  }
}
