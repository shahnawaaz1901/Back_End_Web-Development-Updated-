import mongoose from "mongoose";
import PostModel from "./posts.schema.js";
import ApplicationError from "../error/error.class.js";
export default class PostRepository {
  async new(postData) {
    try {
      const newPost = new PostModel(postData);
      await newPost.save();
      return newPost;
    } catch (error) {
      throw error;
    }
  }

  async get(userId) {
    try {
      return await PostModel.find({
        user: new mongoose.Types.ObjectId(userId),
      });
    } catch (error) {
      throw error;
    }
  }

  async getOne(postId) {
    try {
      return await PostModel.findById(postId);
    } catch (error) {
      throw error;
    }
  }

  async update(updatedData, requireData) {
    try {
      const data = await PostModel.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(requireData.postId),
          user: new mongoose.Types.ObjectId(requireData.userId),
        },
        updatedData,
        { returnDocument: "after" }
      );
      if (!data) {
        throw new ApplicationError("Post not found !!", 404);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async delete(requireData) {
    try {
      const deletedPost = await PostModel.deleteOne({
        _id: new mongoose.Types.ObjectId(requireData.postId),
        user: new mongoose.Types.ObjectId(requireData.userId),
      });
      return deletedPost.deletedCount;
    } catch (error) {
      throw error;
    }
  }
}
