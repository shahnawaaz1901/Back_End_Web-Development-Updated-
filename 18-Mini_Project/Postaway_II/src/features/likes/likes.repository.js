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
        throw new ApplicationError(`${likeInfo.id} not found !!`, 404);
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

      if (likeData.matchedCount > 0) {
        throw new ApplicationError(`Already Liked This ${likeInfo.type}`, 406);
      }
      entityExist.likes.push(likeData.upsertedId);
      await entityExist.save({ session });
      await session.commitTransaction();
      return likeData;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  //* Remove Like
  async remove(info) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const removeData = await LikeModel.findOneAndDelete(
        {
          _id: info.likeId,
          user: info.userId,
          on_model: info.type,
        },
        { session }
      );
      if (!removeData) {
        throw new ApplicationError("Like not found !!", 404);
      }
      const entityModel =
        removeData.on_model == "Post"
          ? PostModel
          : removeData.on_model == "Comment"
          ? CommentModel
          : UserModel;

      await entityModel.findOneAndUpdate(
        { _id: removeData.likeable },
        { $pull: { likes: removeData._id } },
        { session }
      );
      await session.commitTransaction();
      return `Like Removed Successfully...`;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  //* Get Likes
  async get(itemInfo) {
    try {
      return await LikeModel.find({
        likeable: itemInfo.id,
        on_model: itemInfo.type,
      }).populate("user");
    } catch (error) {
      throw error;
    }
  }
}
