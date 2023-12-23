import mongoose from "mongoose";
import FriendModel from "./friends.schema.js";
export default class FriendRepository {
  async get(userId) {
    return await FriendModel.findOne({
      user: new mongoose.Types.ObjectId(userId),
    });
  }

  async accept(friendObject) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
    }
  }

  async send(friendObject) {
    const session = await mongoose.startSession();
  }

  async reject(friendObject) {}

  async remove(friendObject) {}
}
