import mongoose from "mongoose";
import LikeModel from "./likes.schema.js";
import CommentModel from "../comments/comments.schema.js";
import PostModel from "../posts/posts.schema.js";
import UserModel from "../users/users.schema.js";
import ApplicationError from "../error/error.class.js";

export default class LikeRepository {
  //* Add Like
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
      const likeData = await LikeModel.updateOne(
        {
          user: likeInfo.userId,
          likeable: likeInfo.id,
        },
        {
          on_model: likeInfo.type,
        },
        { upsert: true, returnDocument: "before", session }
      );
      // throw new ApplicationError("Or Bhai", 404);
      console.log(likeData);
      if (likeData.matchedCount > 0) {
        throw new ApplicationError(`Already Liked This ${likeInfo.type}`, 406);
      }
      entityExist.likes.push(likeData.upsertedId);
      await entityExist.save({ session });
      await session.commitTransaction();
      await session.endSession();
      return `${likeInfo.type} Liked Successfully..`;
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      if (error instanceof ApplicationError) {
        throw new ApplicationError(error.message, error.errStatusCode);
      }
      throw new Error(error.message);
    }
  }

  //* Remove Like
  async remove(info) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const removeData = await LikeModel.deleteOne(
        {
          _id: new mongoose.Types.ObjectId(info.likeId),
          user: new mongoose.Types.ObjectId(info.userId),
        },
        { session }
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
        { session }
      );
      await session.commitTransaction();
      await session.endSession();
      return `Like Removed Successfully...`;
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      if (error instanceof ApplicationError) {
        throw new ApplicationError(error.message, error.errStatusCode);
      }
      throw new Error(error);
    }
  }
}
