import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.JWT_Token;
    const payLoad = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = payLoad._id;
    next();
  } catch (error) {
    console.log(error);
    res.status(404).send("Please Login to Access");
  }
};

export default auth;
