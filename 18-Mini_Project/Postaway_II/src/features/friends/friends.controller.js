import FriendRepository from "./friends.respository.js";

export default class FriendController {
  constructor() {
    this.friendRepository = new FriendRepository();
  }

  async getFriends(req, res) {
    const { userId } = req;
    const friends = await this.friendRepository.get(userId);
    res.status(200).send({ success: true, friends: friends.friendList });
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

  acceptRequest(req, res) {}

  rejectRequest(req, res) {}

  removeFriend(req, res) {}
}
