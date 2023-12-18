import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  caption: String,
  imageURL: String,
  location: String,
  timeStamp: {
    type: String,
    required: true,
  },
  tags: [
    {
      user: mongoose.Schema.Types.ObjectId,
    },
  ],
  likes: [
    {
      user: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const PostModel = mongoose.model("Post", postSchema);
export default PostModel;
