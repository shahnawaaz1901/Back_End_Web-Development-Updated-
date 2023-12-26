import FriendRepository from "./friends.respository.js";
import ApplicationError from "../error/error.class.js";
export default class FriendController {
  constructor() {
    this.friendRepository = new FriendRepository();
  }

  async getFriends(req, res) {
    try {
      const { userId } = req;
      const friends = await this.friendRepository.get(userId);
      res.status(200).send({ success: true, friends: friends.friendList });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with Database", 500);
    }
  }

  async sendRequest(req, res) {
    try {
      const { userId } = req;
      const { user } = req.params;
      if (!user) {
        throw new Error("Invalid User Type !!");
      }
      await this.friendRepository.send({
        fromUser: userId,
        toUser: user,
      });
      res
        .status(200)
        .json({ success: true, message: "Request Sent Successfully !!" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ success: false, message: "Internal Server Error !!" });
    }
  }

  async acceptRequest(req, res) {
    try {
      const { userId } = req;
      const { user } = req.params;
      if (!user) {
        throw new ApplicationError("Request id must be present", 406);
      }
      await this.friendRepository.accept({ userId, requestUser: user });
      res
        .status(201)
        .json({ success: true, message: "Request Accepted Successfully !!" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Something went wrong !!" });
    }
  }

  async rejectRequest(req, res) {
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
        .send({ success: true, message: "Request Reject Successfully !!" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ success: false, message: "Something went Wrong !!" });
    }
  }

  async removeFriend(req, res) {
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
      console.log(error);
      res.status(500).json({ success: false, message: "Something went Wrong" });
    }
  }
}
