import UserModel from "../models/user.model.js";
import sendNotification from "../../nodemailer.js";
export default class UserController {
  getLogin(req, res) {
    res.render("login", {
      title: "Recruiter Login | Easily",
      error: null,
    });
  }

  ragisterUser(req, res) {
    UserModel.addNewUser(req.body);
    const { email } = req.body;
    sendNotification(email, "newUser");
    res.redirect("/users/login");
  }

  loginUser(req, res) {
    const result = UserModel.authenticateUser(req.body);
    if (result) {
      const { email } = req.body;
      sendNotification(email, "login");
      req.session.name = result.name;
      res.render("index", { name: result.name, title: "Job Portal | Easily" });
    } else {
      res.render("login", {
        title: "Login",
        error: "Invalid Credentials !!",
      });
    }
  }

  logOut(req, res) {
    const name = req.session.name;
    req.session.destroy(() => {
      console.log(`Session is Ended for ${name}!!`);
      res.redirect("/");
    });
  }
}
