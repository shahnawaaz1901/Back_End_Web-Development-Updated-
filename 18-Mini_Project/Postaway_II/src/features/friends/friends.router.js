import express from "express";
import FriendController from "./friends.controller.js";

const friendRouter = express.Router();
const friendController = new FriendController();

friendRouter.get("/getFriends", (req, res) => {
  friendController.getFriends(req, res);
});

friendRouter.post("/sendRequest/:user", (req, res) => {
  friendController.sendRequest(req, res);
});

friendRouter.post("/acceptRequest/:user", (req, res) => {
  friendController.acceptRequest(req, res);
});

friendRouter.post("/rejectRequest/:user", (req, res) => {
  friendController.rejectRequest(req, res);
});

friendRouter.post("/removeFriend/:friendId", (req, res) => {
  friendController.removeFriend(req, res);
});

export default friendRouter;
