import PostModel from "./posts.schema.js";
export default class PostRepository {
  async new(postData) {
    console.log(postData);
  }

  async get(userId) {}

  async getOne(postId) {}

  async update(updatedData, requireData) {}

  async delete(requireData) {}
}
