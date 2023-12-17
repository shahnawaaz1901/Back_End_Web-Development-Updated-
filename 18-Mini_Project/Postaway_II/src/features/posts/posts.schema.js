import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
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
    },
  ],
  comments: [
    {
      user: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const PostModel = mongoose.model("Post", postSchema);
export default PostModel;
