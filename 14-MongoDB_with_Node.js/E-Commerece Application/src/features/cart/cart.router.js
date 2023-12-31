//* Import Nessesory Modules
import express from 'express';
import CartController from './cart.controller.js';

//* Initialize Express Router
const cartRouter = express.Router();

//* Create the Instance of CartController
const cartController = new CartController();

//* Add Product to the Cart
cartRouter.post("/addToCart",cartController.addToCart);
cartRouter.get("/",cartController.getCartItems);
cartRouter.delete("/remove/:itemId", cartController.removeFromCart);
//* Export Router
export default cartRouter;