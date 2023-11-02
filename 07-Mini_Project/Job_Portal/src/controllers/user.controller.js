import session from "express-session";
import UserModel from "../models/user.model.js";
import sendNotification from "../../nodemailer.js";
export default class UserController {
  getLogin(req, res) {
    res.render("login", {
      title: "Login",
      error: null,
    });
  }

  ragisterUser(req, res) {
    UserModel.addNewUser(req.body);
    const { email } = req.body;
    sendNotification(email, "newUser");
    res.redirect("/login");
  }

  loginUser(req, res) {
    const result = UserModel.authenticateUser(req.body);
    if (result) {
      req.session.name = result.name;
      res.render("index", { name: result.name, title: "Easy - A Job Portal" });
    } else {
      res.render("login", {
        title: "Login",
        error: "Invalid Credentials !!",
      });
    }
  }
}
