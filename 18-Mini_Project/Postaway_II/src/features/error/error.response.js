import ApplicationError from "./error.class.js";
import mongoose from "mongoose";

import { logger } from "../../middlewares/winston.logger.js";
const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  logger.error({
    url: req.url,
    data: req.body,
    time: new Date().toString(),
    error: err.message,
  });
  if (err instanceof ApplicationError) {
    return res
      .status(err.errStatusCode)
      .json({ success: false, message: err.message });
  }

  if (
    err instanceof mongoose.Error.ValidationError ||
    err instanceof mongoose.mongo.MongoError
  ) {
    return res.status(406).json({ success: false, message: err.message });
  }

  if (
    err instanceof mongoose.Error.CastError ||
    err instanceof mongoose.mongo.BSON.BSONError
  ) {
    return res.status(406).json({ success: false, message: "Invalid Id" });
  }
  res.status(500).json({ success: false, error: "Something went wrong !!" });
};

export default errorMiddleware;
