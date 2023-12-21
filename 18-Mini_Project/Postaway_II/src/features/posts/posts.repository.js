import mongoose from "mongoose";
import PostModel from "./posts.schema.js";
export default class PostRepository {
  async new(postData) {
    try {
      const newPost = new PostModel(postData);
      await newPost.save();
      return newPost;
    } catch (error) {
      console.log(error);
    }
  }

  async get(userId) {
    try {
      return await PostModel.find({
        user: new mongoose.Types.ObjectId(userId),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(postId) {
    try {
      return await PostModel.findById(postId);
    } catch (error) {
      console.log(error);
    }
  }

  async update(updatedData, requireData) {
    try {
      return await PostModel.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(requireData.postId),
          user: new mongoose.Types.ObjectId(requireData.userId),
        },
        updatedData,
        { returnDocument: "after" }
      );
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }
}
