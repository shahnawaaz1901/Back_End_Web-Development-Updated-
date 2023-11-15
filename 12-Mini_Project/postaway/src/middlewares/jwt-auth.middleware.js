import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("UnAuthorize Access");
  }

  try {
    const payload = jwt.verify(authHeader, "z9Vtqt5k2LFzUTEttfY8");
    req.userId = payload.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("UnAuthorize Access");
  }
};

export default jwtAuth;
