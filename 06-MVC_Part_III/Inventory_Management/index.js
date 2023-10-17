import express from "express";
import path from "path";
import ProductsController from "./src/controllers/product.controller.js";
import UserController from "./src/controllers/user.controller.js";
import expressEjsLayouts from "express-ejs-layouts";
import validate from "./src/middlewares/validate.middlware.js";
import uploadFile from "./src/middlewares/file-upload.middleware.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";

const server = express();
// **MiddleWares**
//? SetUp View Engine
server.set("view engine", "ejs");
server.set("views", path.join("src", "views"));

//? Use MiddleWare express.static to Render the css and js file
server.use(express.static(path.join("src", "views")));
server.use(express.static("public"));

//? Use Sessioons
server.use(session({
  secret : 'SecretKey',
  resave : false,
  saveUninitialized : true,
  cookie: { secure:false }      //*if secure is true then it means used https protocol otherwise use http in false condition
}))


//? Use Layouts
server.use(expressEjsLayouts);

//? urlEncoded as Middleware to decode the data which browser sent from the user
server.use(express.urlencoded({ extended: true }));

//* For Use a function which is Inside in Class we Need to Create Object of that Class
let products = new ProductsController();
let users = new UserController();
//* Setup the Routers
server.get("/ragister",users.getRagister);
server.get("/login",users.getLogin);
server.post("/login",users.userLogin);
server.post("/ragister",users.newUserRagistration);
server.get("/logout",users.userLogOut);
//*Add middleware to verify that user is loggedin or Not
server.get("/", auth, products.getProduct);
server.get("/new-product",auth, products.getAddProductForm);
server.get("/update-product/:id",auth, products.getUpdateProductView);
server.post("/update-product",auth, products.postUpdateProduct);
server.post("/delete-product/:id",auth, products.deleteProduct);

/* uploadFile is Object where single stores the uploaded image URL of User*/
server.post(
  "/",
  /* for Validation first we Need to Receive the file and After Receiving Validation Process Completed */
  uploadFile.single("imageURL"),
  validate,
  products.addNewProducts
);

// *Listen the Server at PORT 3200
server.listen(3200, function (err) {
  if (err) {
    console.log(`Error : ${err}`);
    return;
  }
  console.log(`Server is Up and Run on Port : 3200`);
});
