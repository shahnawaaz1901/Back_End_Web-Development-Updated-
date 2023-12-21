import CommentModel from "./comments.schema.js";
import PostModel from "../posts/posts.schema.js";
import mongoose from "mongoose";

export default class CommentRepository {
  async create(object) {
    console.log(object);
    const postExist = await PostModel.findById(object.postId);
    if (!postExist) {
      return;
    }
    const newComment = new CommentModel({
      user: new mongoose.Types.ObjectId(object.userId),
      comment: object.comment,
    });
    await newComment.save();
    await PostModel.updateOne(
      {
        _id: new mongoose.Types.ObjectId(object.postId),
      },
      {
        $push: {
          comments: newComment._id,
        },
      }
    );
    return newComment;
  }

  read() {}

  update() {}

  delete() {}
}
