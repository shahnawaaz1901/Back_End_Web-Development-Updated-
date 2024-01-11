import mongoose from "mongoose";
import FriendModel from "./friends.schema.js";
import UserModel from "../users/users.schema.js";
import ApplicationError from "../error/error.class.js";

export default class FriendRepository {
  //* Get Friend List
  async get(userId) {
    return await FriendModel.findOne({
      user: new mongoose.Types.ObjectId(userId),
    }).populate("friendList");
  }

  //* Accept Friend Request
  async accept(friendObject) {
    const session = await mongoose.startSession();
    const { userId, requestUser } = friendObject;
    try {
      session.startTransaction();
      //* Check if Requested User Send Friend Requests or Not
      const userSendRequest =
        (await FriendModel.findOne({
          user: requestUser,
          sendRequests: userId,
        })) &&
        (await FriendModel.findOne({
          user: userId,
          pendingRequests: requestUser,
        }));

      if (!userSendRequest) {
        throw new ApplicationError("Request not found !!", 404);
      }

      await FriendModel.updateOne(
        {
          user: new mongoose.Types.ObjectId(userId),
        },
        {
          $pull: {
            pendingRequests: new mongoose.Types.ObjectId(requestUser),
          },
          $push: {
            friendList: requestUser,
          },
        }
      );
      await FriendModel.updateOne(
        {
          user: new mongoose.Types.ObjectId(requestUser),
        },
        {
          $pull: {
            sendRequests: new mongoose.Types.ObjectId(userId),
          },
          $push: {
            friendList: userId,
          },
        }
      );
      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw error;
    }
  }

  //* Send Friend Request
  async send(friendObject) {
    /* //*Another way to create Session */
    // const db = await mongoose.createConnection(process.env.DB_URL).asPromise();
    // await db.startSession();
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const userExist = await UserModel.findById(friendObject.toUser);
      if (!userExist) {
        throw new ApplicationError("User not found", 404);
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
      throw error;
    }
  }

  //* Reject Friend Request
  async reject(friendObject) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await FriendModel.findOneAndUpdate(
        { user: new mongoose.Types.ObjectId(friendObject.receiveRequest) },
        {
          $pull: {
            pendingRequests: new mongoose.Types.ObjectId(
              friendObject.sendRequest
            ),
          },
        }
      );

      await FriendModel.findOneAndUpdate(
        { user: new mongoose.Types.ObjectId(friendObject.sendRequest) },
        {
          $pull: {
            pendingRequests: new mongoose.Types.ObjectId(
              friendObject.receiveRequest
            ),
          },
        }
      );
      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      console.log(error);
      throw error;
    }
  }

  //* Remove Friend
  async remove(friendObject) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const bothFriends = await FriendModel.findOneAndUpdate(
        {
          user: new mongoose.Types.ObjectId(friendObject.user),
        },
        {
          $pull: {
            friendList: new mongoose.Types.ObjectId(friendObject.friendId),
          },
        },
        { returnDocument: "after" }
      );
      if (!bothFriends) {
        throw new Error("Both are not friends !!");
      }
      await FriendModel.updateOne(
        {
          user: new mongoose.Types.ObjectId(friendObject.friendId),
        },
        {
          $pull: {
            friendList: new mongoose.Types.ObjectId(friendObject.user),
          },
        }
      );
      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      console.log(error);
      throw error;
    }
  }
}
