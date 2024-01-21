import CommentModel from "./comments.schema.js";
import PostModel from "../posts/posts.schema.js";
import mongoose from "mongoose";
import ApplicationError from "../error/error.class.js";

export default class CommentRepository {
  async create(object) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const newComment = new CommentModel({
        user: object.userId,
        post: object.postId,
        comment: object.comment,
      });

      //* Push the CommentId on the Post
      const postExist = await PostModel.findOneAndUpdate(
        { _id: object.postId },
        {
          $push: {
            comments: newComment._id,
          },
        },
        { returnDocument: "after", session }
      );

      //* Check if Post Exist or Not
      if (!postExist) {
        throw new ApplicationError("Post not found !!", 404);
      }

      await newComment.save({ session });
      await session.commitTransaction();
      return newComment;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async get(postId) {
    try {
      return await CommentModel.find({
        post: postId,
      });
    } catch (error) {
      throw error;
    }
  }

  async getOne(commentId) {
    try {
      return await CommentModel.findById(commentId);
    } catch (error) {
      throw error;
    }
  }

  async update(updatedData) {
    try {
      const updatedComment = await CommentModel.findOneAndUpdate(
        {
          _id: updatedData.commentId,
          user: updatedData.userId,
        },
        {
          comment: updatedData.newComment,
        },
        { returnDocument: "after" }
      );
      if (!updatedComment) {
        throw new ApplicationError("Comment Not Found !!", 404);
      }
      return updatedComment;
    } catch (error) {
      throw error;
    }
  }

  async delete(commentData) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const deleteComment = await CommentModel.findOneAndDelete(
        {
          _id: commentData.commentId,
          user: commentData.userId,
        },
        {
          session,
          projection: {
            post: 1,
          },
        }
      );
      console.log(deleteComment);
      if (!deleteComment) {
        throw new ApplicationError("Comment Not found !!", 404);
      }
      await PostModel.updateOne(
        { _id: deleteComment.post },
        { $pull: { comments: deleteComment._id } },
        { session }
      );
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
