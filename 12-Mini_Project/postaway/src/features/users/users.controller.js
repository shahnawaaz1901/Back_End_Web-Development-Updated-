//* Create User Class So that We Dont Need to Export All Functions We Can Just Export the Class to use the functions
import notificationAlert from "../alert/notification.alert.js";
import ApplicationError from "../error/application.error.js";
import UsersModel from "./users.model.js";
import jwt from "jsonwebtoken";

export default class UsersController {
  //* Add new User
  signUp(req, res) {
    const result = UsersModel.newUser(req.body);
    notificationAlert(req.body.email, "new");
    res.status(201).send(result);
  }

  //* Login Existing User
  signIn(req, res) {
    const result = UsersModel.existingUser(req.body);
    if (result) {
      notificationAlert(req.body.email, "existing");
      const token = jwt.sign(
        { id: result.id, email: result.email },
        "z9Vtqt5k2LFzUTEttfY8",
        {
          expiresIn: "1h",
        }
      );
      res.status(200).send(token);
    } else {
      throw new ApplicationError("Invalid Credentials",404);
      // res.status(404).send("Invalid Credentials !!");
    }
  }
}
