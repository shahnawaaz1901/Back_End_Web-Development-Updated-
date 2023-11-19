import OrderController from "./order.controller.js";
import express from "express";

const orderController = new OrderController();
const orderRouter = express.Router();

orderRouter.post("/",orderController);

export default orderRouter;
