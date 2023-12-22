import LikeModel from "./likes.schema.js";
export default class LikeRepository {
  async add(likeInfo) {
    const like = new LikeModel({
      user: likeInfo.userId,
      likeable: likeInfo.id,
      on_model: likeInfo.type,
    });
    await like.save();
  }

  async remove() {}
}
