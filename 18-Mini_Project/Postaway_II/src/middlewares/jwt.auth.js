import jwt from "jsonwebtoken";
import UserRepository from "../features/users/users.repository.js";
const userRepository = new UserRepository();
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.JWT_Token;
    const payLoad = jwt.verify(token, process.env.SECRET_KEY);
    const loginAccess = await userRepository.isLoginRequired(
      payLoad._id,
      token
    );
    req.userId = payLoad._id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Please Login to Access" });
  }
};

export default auth;
