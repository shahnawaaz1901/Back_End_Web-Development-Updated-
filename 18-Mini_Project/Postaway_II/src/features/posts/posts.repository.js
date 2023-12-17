import PostModel from "./posts.schema.js";
export default class PostRepository {
  async new(postData) {
    const newPost = new PostModel(postData);
    await newPost.save();
    return newPost;
  }

  async get(userId) {}

  async getOne(postId) {}

  async update(updatedData, requireData) {}

  async delete(requireData) {}
}
