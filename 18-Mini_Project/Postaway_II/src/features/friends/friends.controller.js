import FriendRepository from "./friends.respository.js";
import ApplicationError from "../error/error.class.js";
export default class FriendController {
  constructor() {
    this.friendRepository = new FriendRepository();
  }

  //* Get Friend List of a User
  async getFriends(req, res, next) {
    try {
      const { userId } = req;
      const friends = await this.friendRepository.get(userId);
      res.status(200).json({ success: true, friends: friends.friendList });
    } catch (error) {
      next(error);
    }
  }

  //* Send Request to the User
  async sendRequest(req, res, next) {
    try {
      const { userId } = req;
      const { user } = req.params;
      if (!user) {
        throw new ApplicationError("User Required for Send Request !!", 406);
      }
      await this.friendRepository.send({
        fromUser: userId,
        toUser: user,
      });
      res
        .status(200)
        .json({ success: true, message: "Request Sent Successfully !!" });
    } catch (error) {
      next(error);
    }
  }

  //* Accept Request of a User
  async acceptRequest(req, res, next) {
    try {
      const { userId } = req;
      const { user } = req.params;
      if (!user) {
        throw new ApplicationError("FriendId must be present", 406);
      }
      await this.friendRepository.accept({ userId, requestUser: user });
      res
        .status(201)
        .json({ success: true, message: "Request Accepted Successfully !!" });
    } catch (error) {
      next(error);
    }
  }

  //* Reject Request of a User
  async rejectRequest(req, res, next) {
    try {
      const { userId } = req;
      const { user } = req.params;
      if (!user) {
        throw new ApplicationError("FriendId must be Present", 406);
      }
      await this.friendRepository.reject({
        receiveRequest: userId,
        sendRequest: user,
      });
      res
        .status(200)
        .json({ success: true, message: "Request Reject Successfully !!" });
    } catch (error) {
      next(error);
    }
  }

  //* Remove a User from FriendList
  async removeFriend(req, res, next) {
    try {
      const { userId } = req;
      const { friendId } = req.params;
      if (!friendId) {
        throw new ApplicationError("FriendId must be Present", 406);
      }
      await this.friendRepository.remove({ user: userId, friendId });
      res
        .status(200)
        .json({ success: true, message: "Friend Remove Successfully !!" });
    } catch (error) {
      next(error);
    }
  }
}
