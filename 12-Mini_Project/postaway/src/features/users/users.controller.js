//* Create User Class So that We Dont Need to Export All Functions We Can Just Export the Class to use the functions
import UsersModel from "./users.model.js";

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
      res.status(200).send("User Login Successfully !!");
    } else {
      res.status(404).send("Invalid Credentials !!");
    }
  }

  //* SignOut Existing user
  signOut(req, res) {}
}
