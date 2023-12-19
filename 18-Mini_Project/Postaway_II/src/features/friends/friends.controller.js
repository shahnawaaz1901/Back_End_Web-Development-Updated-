import FriendRepository from "./friends.respository.js";

export default class FriendController {
  constructor() {
    this.friendRepository = new FriendRepository();
  }

  getFriends(req, res) {}

  sendRequest(req, res) {}

  acceptRequest(req, res) {}

  rejectRequest(req, res) {}

  removeFriend(req, res) {}
}
