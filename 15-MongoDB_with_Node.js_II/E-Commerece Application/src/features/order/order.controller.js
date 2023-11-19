import OrderModel from "./order.model.js";
import OrderRepository from "./order.repository.js";
export default class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async placeOrder(req, res) {
    const userId = req.userId;
  }
}
