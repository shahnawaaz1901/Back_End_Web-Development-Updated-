import express from "express";
import FriendController from "./friends.controller.js";

const friendRouter = express.Router();
const friendController = new FriendController();

//* Get Friends
friendRouter.get("/getFriends", (req, res, next) => {
  friendController.getFriends(req, res, next);
});

//* Send Friend Request
friendRouter.post("/sendRequest/:user", (req, res, next) => {
  friendController.sendRequest(req, res, next);
});

//* Accept Friend Request
friendRouter.post("/acceptRequest/:user", (req, res, next) => {
  friendController.acceptRequest(req, res, next);
});

//* Reject Friend Request
friendRouter.delete("/rejectRequest/:user", (req, res, next) => {
  friendController.rejectRequest(req, res, next);
});

//* Remove Friend
friendRouter.delete("/removeFriend/:friendId", (req, res, next) => {
  friendController.removeFriend(req, res, next);
});

export default friendRouter;
