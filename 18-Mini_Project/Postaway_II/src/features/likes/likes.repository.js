import mongoose from "mongoose";
import LikeModel from "./likes.schema.js";
import CommentModel from "../comments/comments.schema.js";
import PostModel from "../posts/posts.schema.js";
import UserModel from "../users/users.schema.js";
import ApplicationError from "../error/error.class.js";

export default class LikeRepository {
  async add(likeInfo) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const entityModel =
        likeInfo.type == "Post"
          ? PostModel
          : likeInfo.type == "Comment"
          ? CommentModel
          : UserModel;
      const entityExist = await entityModel.findById(likeInfo.id);
      if (!entityExist) {
        throw new ApplicationError(`${id} not found !!`, 404);
      }
      const likeData = LikeModel.findOneAndUpdate(
        {
          user: likeInfo.userId,
          likeable: likeInfo.id,
          on_model: likeInfo.type,
        },
        {},
        { session, upsert: true }
      );
      entityExist.likes.push(likeData._id);
      await entityExist.save({ session });
      await session.commitTransaction();
      await session.endSession();
      return likeData;
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(error.message);
    }
  }

  async remove(info) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const removeData = await LikeModel.deleteOne(
        {
          _id: new mongoose.Types.ObjectId(info.likeId),
          user: new mongoose.Types.ObjectId(info.userId),
        },
        session
      );
      if (!removeData.deletedCount) {
        throw new ApplicationError("Like not found !!", 404);
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
        { returnDocument: "after", session }
      );
      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      console.log(error);
    }
  }
}
