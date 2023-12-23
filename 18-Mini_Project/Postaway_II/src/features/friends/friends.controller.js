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

  sendRequest(req, res) {}

  acceptRequest(req, res) {}

  rejectRequest(req, res) {}

  removeFriend(req, res) {}
}
