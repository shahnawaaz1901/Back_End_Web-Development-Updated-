//* Import Nessesory Modules
import express from "express";
import CartController from "./cart.controller.js";

//* Initialize Express Router
const cartRouter = express.Router();

//* Create the Instance of CartController
const cartController = new CartController();

//* Add Product to the Cart
cartRouter.post("/addToCart", (req, res) => {
  cartController.addToCart(req, res);
});
cartRouter.get("/", (req, res) => {
  cartController.getCartItems(req, res);
});
cartRouter.delete("/remove/:productId", (req, res) => {
  cartController.removeFromCart(req, res);
});
//* Export Router
export default cartRouter;
