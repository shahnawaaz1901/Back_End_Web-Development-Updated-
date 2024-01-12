import mongoose, { mongo } from "mongoose";

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
  update: {
    date: {
      type: String,
    },
    time: {
      type: String,
    },
  },
});

const CommentModel = mongoose.model("Comment", commentSchema);
export default CommentModel;
