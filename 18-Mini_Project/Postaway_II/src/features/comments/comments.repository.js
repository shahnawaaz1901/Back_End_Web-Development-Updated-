import CommentModel from "./comments.schema.js";
import PostModel from "../posts/posts.schema.js";
import mongoose from "mongoose";

export default class CommentRepository {
  async create(object) {
    try {
      const postExist = await PostModel.findById(object.postId);
      if (!postExist) {
        return;
      }
      const newComment = new CommentModel({
        user: object.userId,
        post: object.postId,
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(updatedData) {
    const post = await PostModel.findById(updatedData.postId);
    if (!post) {
      throw new Error("Post not found !!");
    }

    const commentExist = await CommentModel.findOne({
      _id: new mongoose.Types.ObjectId(updatedData.commentId),
      user: new mongoose.Types.ObjectId(updatedData.userId),
    });
    if (!commentExist) {
      throw new Error("Comment Not Found !!");
    }

    commentExist.comment = updatedData.newComment;
    await commentExist.save();
    return commentExist;
  }

  async delete(commentData) {
    const postExist = await PostModel.findById(commentData.postId);
    if (!postExist) {
      throw new Error("Post not Found !!");
    }

    const deleteComment = await CommentModel.deleteOne({
      user: new mongoose.Types.ObjectId(commentData.userId),
      _id: new mongoose.Types.ObjectId(commentData.commentId),
    });
    if (!deleteComment.deletedCount) {
      throw new Error("Comment not found !!");
    }
  }
}
