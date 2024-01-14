import ApplicationError from "./error.class.js";
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
  res.status(500).json({ success: false, error: "Something went wrong !!" });
};

export default errorMiddleware;
