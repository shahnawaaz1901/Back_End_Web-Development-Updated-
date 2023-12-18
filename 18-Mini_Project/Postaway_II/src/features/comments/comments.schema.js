import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjecId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const CommentModel = mongoose.model("Comment", CommentSchema);
export default CommentModel;
