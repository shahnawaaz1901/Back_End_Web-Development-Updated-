import validateRequest from "../middlewares/validate.middlware.js";
import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";
export default class UserController {
  getRagister(req, res) {
    res.render("ragistration", {
      title: "New User",
    });
  }

  getLogin(req, res) {
    res.render("login", {
      title: "Login",
      errorMessages : null
    });
  }

  newUserRagistration(req, res) {
    console.log(req.body);
    if (req.body.password != req.body.confirmPassword) {
      return res.send("Password Should be Matched !!");
    }
    const { name, email, password } = req.body;
    UserModel.addUser(name, email, password);
    res.render("login", {
      title: "Login",
      errorMessages: null,
    });
  }

  userLogin(req, res) {
    console.log(req.body);
    const { email, password } = req.body;
    let validUser = UserModel.isValidUser(email, password);
    if (!validUser) {
      res.render("login", {
        title: "login",
        errorMessages: "Invalid Credentials..",
      });
    }else{
        res.render("/", {
            title: "Products",
            products : ProductModel.getProducts()
        });
    }
  }
}
