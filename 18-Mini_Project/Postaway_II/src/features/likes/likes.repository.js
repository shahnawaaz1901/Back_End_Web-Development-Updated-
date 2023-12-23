import mongoose from "mongoose";
import LikeModel from "./likes.schema.js";
import CommentModel from "../comments/comments.schema.js";
import PostModel from "../posts/posts.schema.js";
import UserModel from "../users/users.schema.js";

export default class LikeRepository {
  async add(likeInfo) {
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
    const likeData = new LikeModel({
      user: likeInfo.userId,
      likeable: likeInfo.id,
      on_model: likeInfo.type,
    });
    await likeData.save();
    entityExist.likes.push(likeData._id);
    await entityExist.save();
    return likeData;
  }

  async remove(info) {
    const removeData = await LikeModel.deleteOne({
      _id: new mongoose.Types.ObjectId(info.likeId),
      user: new mongoose.Types.ObjectId(info.userId),
    });
    if (!removeData.deletedCount) {
    }
    const entityModel =
      info.type == "Post"
        ? PostModel
        : info.type == "Comment"
        ? CommentModel
        : UserModel;

    await entityModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(info.likeableDataId) },
      { $pull: { likes: new mongoose.Types.ObjectId(info.likeId) } },
      { returnDocument: "after" }
    );
  }
}
