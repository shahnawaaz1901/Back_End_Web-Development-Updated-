import mongoose from "mongoose";
import FriendModel from "./friends.schema.js";
import UserModel from "../users/users.schema.js";
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
      await FriendModel.updateOne(
        {
          user: new mongoose.Types.ObjectId(friendObject.userId),
        },
        {
          $pull: {
            pendingRequests: new mongoose.Types.ObjectId(
              friendObject.requestUser
            ),
          },
          $push: {
            friendList: friendObject.requestUser,
          },
        }
      );
      await FriendModel.updateOne(
        {
          user: new mongoose.Types.ObjectId(friendObject.requestUser),
        },
        {
          $pull: {
            sendRequests: new mongoose.Types.ObjectId(friendObject.userId),
          },
          $push: {
            friendList: friendObject.userId,
          },
        }
      );
      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
    }
  }

  async send(friendObject) {
    /* //*Another way to create Session */
    // const db = await mongoose.createConnection(process.env.DB_URL).asPromise();
    // await db.startSession();
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const userExist = await UserModel.findById(friendObject.toUser);
      if (!userExist) {
        throw new Error("User not found");
      }
      await FriendModel.findOneAndUpdate(
        {
          user: new mongoose.Types.ObjectId(friendObject.fromUser),
        },
        {
          $push: { sendRequests: friendObject.toUser },
        },
        {
          session,
        }
      );
      await FriendModel.findOneAndUpdate(
        {
          user: new mongoose.Types.ObjectId(friendObject.toUser),
        },
        { $push: { pendingRequests: friendObject.fromUser } },
        { session }
      );
      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      console.log(error);
    }
  }

  async reject(friendObject) {}

  async remove(friendObject) {}
}
