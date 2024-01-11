import mongoose from "mongoose";
import FriendModel from "./friends.schema.js";
import UserModel from "../users/users.schema.js";
import ApplicationError from "../error/error.class.js";

export default class FriendRepository {
  /* Private Functions */

  //* Check is Both users Are Friends or Not
  async #checkBothFriends(user1, user2) {
    return (
      (await FriendModel.findOne({
        user: user1,
        friendList: user2,
      })) &&
      (await FriendModel.findOne({
        user: user2,
        friendList: user1,
      }))
    );
  }

  //* Check if User1 sends Request to User2
  async #checkIfUserSendRequest(user1, user2) {
    return (
      (await FriendModel.findOne({
        user: user1,
        sendRequests: user2,
      })) &&
      (await FriendModel.findOne({
        user: user2,
        pendingRequests: user1,
      }))
    );
  }

  //* Get Friend List
  async get(userId) {
    return await FriendModel.findOne({
      user: new mongoose.Types.ObjectId(userId),
    }).populate("friendList");
  }

  //* Accept Friend Request
  async accept(friendObject) {
    const session = await mongoose.startSession();
    try {
      const { userId: reciever, requestUser: sender } = friendObject;
      if (sender == reciever) {
        throw new ApplicationError("Request not Accepted to Self !!", 406);
      }
      session.startTransaction();
      //* Check if Requested User Send Friend Requests or Not
      const userSendRequest = await this.#checkIfUserSendRequest(
        sender,
        reciever
      );

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
    try {
      session.startTransaction();
      const { toUser: reciever, fromUser: sender } = friendObject;
      if (sender == reciever) {
        throw new ApplicationError("Request not send to self !!", 406);
      }
      //* Check User Exist or Not
      const userExist = await UserModel.findById(friendObject.toUser);
      if (!userExist) {
        throw new ApplicationError("User not found !!", 404);
      }

      //* Check if Both users are Already Friends or Not
      const bothUserFriends = await this.#checkBothFriends(sender, reciever);
      if (bothUserFriends) {
        throw new ApplicationError("This user is Friend Already !!", 406);
      }
      await FriendModel.findOneAndUpdate(
        {
          user: new mongoose.Types.ObjectId(sender),
        },
        {
          $push: { sendRequests: reciever },
        },
        { session }
      );
      await FriendModel.findOneAndUpdate(
        {
          user: new mongoose.Types.ObjectId(reciever),
        },
        { $push: { pendingRequests: sender } },
        { session }
      );
      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw error;
    }
  }

  //* Reject Friend Request
  async reject(friendObject) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const { receiveRequest: reciever, sendRequest: sender } = friendObject;
      if (sender == reciever) {
        throw new ApplicationError("Can't Reject Self !!", 406);
      }
      /* First Check if User Sent Request of Not */
      const requestForFriend =
        (await FriendModel.findOne({
          user: sender,
          sendRequests: reciever,
        })) &&
        (await FriendModel.findOne({
          user: reciever,
          pendingRequests: sender,
        }));
      if (!requestForFriend) {
        throw new ApplicationError("Request not found for the User !!", 404);
      }
      await FriendModel.findOneAndUpdate(
        { user: new mongoose.Types.ObjectId(sender) },
        {
          $pull: {
            sendRequests: new mongoose.Types.ObjectId(reciever),
          },
        }
      );

      await FriendModel.findOneAndUpdate(
        { user: new mongoose.Types.ObjectId(reciever) },
        {
          $pull: {
            pendingRequests: new mongoose.Types.ObjectId(sender),
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

  //* Remove Friend
  async remove(friendObject) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const { user, friendId } = friendObject;
      if (user == friendId) {
        throw new ApplicationError("Can't Remove Self as a Friend !!", 406);
      }
      const bothFriends = await this.#checkBothFriends(user, friendId);
      if (!bothFriends) {
        throw new ApplicationError("Both are not friends !!", 406);
      }
      await FriendModel.updateOne(
        {
          user: new mongoose.Types.ObjectId(friendId),
        },
        {
          $pull: {
            friendList: new mongoose.Types.ObjectId(user),
          },
        }
      );
      await FriendModel.updateOne(
        {
          user: new mongoose.Types.ObjectId(friendId),
        },
        {
          $pull: {
            friendList: new mongoose.Types.ObjectId(user),
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
}
