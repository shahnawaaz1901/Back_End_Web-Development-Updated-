import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "on_model",
  },
  on_model: {
    type: String,
    enum: ["Post", "User", "Comment"],
    required: true,
  },
});

const LikeModel = mongoose.models("Like", LikeSchema);
export default LikeModel;
