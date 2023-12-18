import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
  friendList: [
    {
      user: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  pendingRequests: [
    {
      user: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  sentRequests: [
    {
      user: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const FriendModel = mongoose.model("Friend", friendSchema);
export default FriendModel;
