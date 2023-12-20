import mongoose from "mongoose";
import PostModel from "./posts.schema.js";
export default class PostRepository {
  async new(postData) {
    const newPost = new PostModel(postData);
    await newPost.save();
    return newPost;
  }

  async get(userId) {
    return await PostModel.find({ user: new mongoose.Types.ObjectId(userId) });
  }

  async getOne(postId) {
    return await PostModel.findById(postId);
  }

  async update(updatedData, requireData) {
    return await PostModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(requireData.postId),
        user: new mongoose.Types.ObjectId(requireData.userId),
      },
      updatedData,
      { returnDocument: "after" }
    );
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
