import LikeModel from "./likes.schema.js";
import CommentModel from "../comments/comments.schema.js";
import PostModel from "../posts/posts.schema.js";
import UserModel from "../users/users.schema.js";

export default class LikeRepository {
  async add(likeInfo) {
    const likeData = new LikeModel({
      user: likeInfo.userId,
      likeable: likeInfo.id,
      on_model: likeInfo.type,
    });
    await likeData.save();
    const entityModel =
      likeInfo.type == "Post"
        ? PostModel
        : likeInfo.type == "Comment"
        ? CommentModel
        : UserModel;
    const entityExist = await entityModel.findById(likeInfo.id);
    if (!entityExist) {
      throw new Error(`${id} not found !!`);
    }
    entityExist.likes.push(likeData._id);
    await entityExist.save();
    return likeData;
  }

  async remove(info) {}
}
