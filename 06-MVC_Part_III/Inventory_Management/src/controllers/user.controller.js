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
    const { name, email, password } = req.body;
    UserModel.addUser(name, email, password);
    res.render("login", {
      title: "Login",
      errorMessages: null,
    });
  }

  userLogin(req, res) {
    const { email, password } = req.body;
    let validUser = UserModel.isValidUser(email, password);
    if (!validUser) {
      console.log("Inside validUser Undefined !!");
      return res.render("login", {
        title: "login",
        errorMessages: "Invalid Credentials..",
      });
    }
    req.session.userEmail = email;        //*Send sessionId to the Client in the form of Cookie
    res.render("products", {
        title: "Products",
        products : ProductModel.getProducts(),
        userEmail : req.session.userEmail,
    });
  }

  userLogOut(req, res){
    //* On Logout We Need to Destroy Session
    req.session.destroy((err)=>{
      if(err){
        console.log(err);
        return;
      }
      res.clearCookie('lastVisit');
      res.redirect('/');
    })
  }


}
