import UsersModel from "../features/users/users.model.js";

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"]; //* Get Value of authorization header in encoded form

  if (!authHeader) {
    //* If Header Not Present
    res.status(401).send("UnAuthorize Access !!");
  }

  //* If Header is Present then base64 Encoded format contains Basic Keyword so remove the keyword
  const base64Credentials = authHeader.replace("Basic", "");

  //* Now Decode the encoded data Using Buffer
  const decodeData = Buffer.from(base64Credentials, "base64");

  //* Convert the Decode Data Into the String
  const decodeDataString = decodeData.toString("utf8");

  //* Now We Get the UserData from Authorization header
  //* Seprate User Email and Password into the Array
  const userData = decodeDataString.split(":");
  const findData = UsersModel.getAllUsers().find(
    (u) => u.email == userData[0] && u.password == userData[1]
  );
  if (findData) {
    next();
  } else {
    res.status(401).send("User Not Found !! ");
  }
};

export default auth;
