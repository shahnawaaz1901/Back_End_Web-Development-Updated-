import mongoose from "mongoose";
import PostModel from "./posts.schema.js";
export default class PostRepository {
  async new(postData) {
    const newPost = new PostModel(postData);
    await newPost.save();
    return (await newPost.populate("user")).populate("tags");
  }

  async get(userId) {
    return await PostModel.find({ user: new mongoose.Types.ObjectId(userId) });
  }

  async getOne(postId) {
    return await PostModel.findById(postId);
  }

  async update(updatedData, requireData) {}

  async delete(requireData) {
    await PostModel.deleteOne({
      _id: new mongoose.Types.ObjectId(requireData.postId),
      user: new mongoose.Types.ObjectId(requireData.userId),
    });
  }
}
