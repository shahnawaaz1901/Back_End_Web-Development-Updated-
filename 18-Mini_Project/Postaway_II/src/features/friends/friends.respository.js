import mongoose from "mongoose";
import FriendModel from "./friends.schema.js";
import UserModel from "../users/users.schema.js";
import ApplicationError from "../error/error.class.js";

export default class FriendRepository {
  /* Private Functions */

  //* Check is Both users Are Friends or Not
  async #checkBothFriends(user1, user2) {
    return await FriendModel.findOne({
      user: user1,
      friendList: user2,
    });
  }

  //* Check if User1 sends Request to User2
  async #checkIfUserSendRequest(user1, user2) {
    return await FriendModel.findOne({
      user: user1,
      sendRequests: user2,
    });
  }

  /* Public Functions */
  //* Get Friend List
  async get(userId) {
    try {
      return await FriendModel.findOne({
        user: new mongoose.Types.ObjectId(userId),
      }).populate("friendList");
    } catch (error) {
      throw error;
    }
  }

  //* Accept Friend Request
  async accept(friendObject) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const { userId: reciever, requestUser: sender } = friendObject;

      if (sender == reciever) {
        throw new ApplicationError("Request not Accepted to Self !!", 406);
      }

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
          user: reciever,
        },
        {
          $pull: {
            pendingRequests: sender,
          },
          $push: {
            friendList: sender,
          },
        }
      );
      await FriendModel.updateOne(
        {
          user: sender,
        },
        {
          $pull: {
            sendRequests: reciever,
          },
          $push: {
            friendList: reciever,
          },
        }
      );
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
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

      //* Check if Request is sent Already by the Sender
      const checkForSender = await this.#checkIfUserSendRequest(
        sender,
        reciever
      );
      if (checkForSender) {
        throw new ApplicationError("Already Requested !!", 406);
      }

      const checkForReciever = await this.#checkIfUserSendRequest(
        reciever,
        sender
      );
      if (checkForReciever) {
        throw new ApplicationError("Please Check Pending Request List", 406);
      }
      //* Check if Both users are Already Friends or Not
      const bothUserFriends = await this.#checkBothFriends(sender, reciever);
      if (bothUserFriends) {
        throw new ApplicationError("Can't Sent Request to Friends !!", 406);
      }
      await FriendModel.findOneAndUpdate(
        {
          user: sender,
        },
        {
          $push: { sendRequests: reciever },
        },
        { session }
      );
      await FriendModel.findOneAndUpdate(
        {
          user: reciever,
        },
        { $push: { pendingRequests: sender } },
        { session }
      );
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
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
      const requestForFriend = await this.#checkIfUserSendRequest(
        sender,
        reciever
      );
      if (!requestForFriend) {
        throw new ApplicationError("Request not found !!", 404);
      }
      await FriendModel.findOneAndUpdate(
        { user: sender },
        {
          $pull: {
            sendRequests: reciever,
          },
        },
        { session }
      );

      await FriendModel.findOneAndUpdate(
        { user: reciever },
        {
          $pull: {
            pendingRequests: sender,
          },
        },
        { session }
      );
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
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
          user: friendId,
        },
        {
          $pull: {
            friendList: user,
          },
        },
        { session }
      );
      await FriendModel.updateOne(
        {
          user: user,
        },
        {
          $pull: {
            friendList: friendId,
          },
        },
        { session }
      );
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
