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
      await session.endSession();
      return newComment;
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw error;
    }
  }

  async get(postId) {
    try {
      return await CommentModel.find({
        post: postId,
      });
    } catch (error) {
      if (error instanceof mongoose.mongo.BSON.BSONError) {
        throw new ApplicationError(error.message, 406);
      }
      throw error;
    }
  }

  async getOne(commentId) {
    try {
      return await CommentModel.findById(commentId);
    } catch (error) {
      if (error instanceof mongoose.mongo.BSON.BSONError) {
        throw new ApplicationError(error.message, 406);
      }
      throw error;
    }
  }

  async update(updatedData) {
    try {
      const post = await PostModel.findById(updatedData.postId);
      if (!post) {
        throw new Error("Post not found !!");
      }

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
      const deleteComment = await CommentModel.deleteOne({
        _id: commentData.commentId,
        user: commentData.userId,
        post: commentData.postId,
      });

      if (!deleteComment.deletedCount) {
        throw new ApplicationError("Comment Not found !!", 404);
      }
      await PostModel.findOneAndUpdate(
        { _id: commentData.postId },
        { $pull: { comments: commentData.commentId } }
      );
      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw error;
    }
  }
}
