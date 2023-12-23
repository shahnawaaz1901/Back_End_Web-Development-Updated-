import ApplicationError from "./error.class.js";
const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res
      .status(err.errStatusCode)
      .json({ success: false, error: err.message });
  }
  res.status(500).json({ success: false, error: "Something went wrong !!" });
};

export default errorMiddleware;
