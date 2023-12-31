import CartRepository from "./cart.repository.js";
import CartModel from "./cart.model.js";
import ApplicationError from "../errorHandler/application.error.js";

export default class CartController {
  constructor() {
    this.cartRepository = new CartRepository();
  }
  async addToCart(req, res) {
    /* 
      In Our Application Adding to Cart Feature has Poblem Like We
      faced earlier in Our add new rating. If Our Same User Update 
      the Quantity of Same Product then instead of replace existing
      quantity Our application added a new Object in Our Database 
      which Contains the Quantity of the product for the user. This
      is Bad Situation where Instead of Update the Quantity of the
      product for a specific user we add new Object with new Quantity
      this occurs Problem in Our App. So we Need to Fix the Problem
    */
    try {
      const { productId, quantity } = req.body;
      const userId = req.userId;
      const productObject = new CartModel(productId, userId, quantity);
      await this.cartRepository.add(productObject);
      res.status(201).send("Item Added to Cart !!");
    } catch (error) {
      throw new ApplicationError("Something Went Wrong", 500);
    }
  }

  async getCartItems(req, res) {
    try {
      const userId = req.userId;
      return res.status(200).send(await this.cartRepository.get(userId));
    } catch (error) {
      throw new ApplicationError("Something Went Wrong", 500);
    }
  }

  async removeFromCart(req, res) {
    try {
      const requireObject = {
        productId: req.params.productId,
        userId: req.userId,
      };
      const result = await this.cartRepository.delete(requireObject);
      if (result.deletedCount) {
        res.status(200).send("Item Remove From Cart !!");
      } else {
        res.status(404).send("Item Not Found !!");
      }
    } catch (error) {
      throw new ApplicationError("Something Went Wrong", 500);
    }
  }
}
