import express from "express";
import ProductController from "./product.controller.js";
import upload from "../../middlewares/file-upload.js";
// *Create Router Product
const ProductRouter = express.Router();

//*Create Instance of Product Controller
const productController = new ProductController();

//* Pass Request to the Controllers
ProductRouter.get("/", productController.getProducts);
ProductRouter.post(
  "/add-product",
  upload.single("imageURL"),
  productController.addProduct
);
ProductRouter.get("/filter", productController.filterProducts);
ProductRouter.get("/:id", productController.getOneProduct);

//* Export Product Router
export default ProductRouter;
