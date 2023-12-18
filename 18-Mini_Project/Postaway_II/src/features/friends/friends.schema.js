import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
  friendList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  pendingRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  sentRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const FriendModel = mongoose.model("Friend", friendSchema);
export default FriendModel;
