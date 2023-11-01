import CartModel from "./cart.model.js";
export default class CartController {
  addToCart(req, res) {
    const {productId, quantity} = req.query;
    /* 
        Bacause We Add userId When We Login in req object userId. So We didn't
        require any id from user in query parameters

    */
    const userId = req.userId;
    CartModel.addItemsToCart(productId, userId, quantity);
    req.status(201).send("Item Added Successfully !!");
  }

  removeFromCart(req, res) {}
}
