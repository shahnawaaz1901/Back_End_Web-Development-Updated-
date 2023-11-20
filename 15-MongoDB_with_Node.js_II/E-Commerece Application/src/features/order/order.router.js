import OrderController from "./order.controller.js";
import express from "express";

const orderController = new OrderController();
const orderRouter = express.Router();

orderRouter.post("/placeOrder", (req, res) => {
  orderController.placeOrder(req, res);
});

export default orderRouter;
