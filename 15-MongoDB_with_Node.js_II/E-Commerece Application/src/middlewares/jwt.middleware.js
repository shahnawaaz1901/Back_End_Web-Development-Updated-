import jwt from "jsonwebtoken";
const jwtAuth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("UnAuthorize Access");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_Secret);
    //* Store User Id for Future to identify the User
    req.userId = payload.userId;
  } catch (error) {
    return res.status(401).send("UnAuthorized User !!");
  }

  next();
};

export default jwtAuth;
