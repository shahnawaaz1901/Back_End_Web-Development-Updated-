import UserModel from "../models/user.model.js";
export default class UserController {
  getLogin(req, res) {
    res.render("login", {
      title: "Login",
    });
  }

  ragisterUser(req, res) {
    UserModel.addNewUser(req.body);
    const {email} = req.body;
    sendNotification(email, "New User");
    res.redirect("/login");
  }

  loginUser(req, res) {
    const result = authenticateUser(req.body);
    if (result) {
      res.redirect("/");
    } else {
      res.render("login", {
        title: "Login",
        error: "Invalid Credentials !!",
      });
    }
  }
}
