//* Create User Class So that We Dont Need to Export All Functions We Can Just Export the Class to use the functions
import UsersModel from "./users.model.js";
import jwt from "jsonwebtoken";

export default class UsersController {
  //* Add new User
  signUp(req, res) {
    const result = UsersModel.newUser(req.body);
    res.status(201).send(result);
  }

  //* Login Existing User
  signIn(req, res) {
    const result = UsersModel.existingUser(req.body);
    if (result) {
      console.log(result);
      const token = jwt.sign(
        { id: result.id, email: result.email },
        "z9Vtqt5k2LFzUTEttfY8",
        {
          expiresIn: "1h",
        }
      );
      res.status(200).send(token);
    } else {
      res.status(404).send("Invalid Credentials !!");
    }
  }

  //* SignOut Existing user
  signOut(req, res) {}
}
