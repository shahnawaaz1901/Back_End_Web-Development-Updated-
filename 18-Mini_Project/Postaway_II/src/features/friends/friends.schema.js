import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
  friendList: [
    {
      user: mongoose.Schema.Types.ObjectId,
    },
  ],
  pendingRequests: [
    {
      user: mongoose.Schema.Types.ObjectId,
    },
  ],
  sentRequests: [
    {
      user: mongoose.Schema.Types.ObjectId,
    },
  ],
});
