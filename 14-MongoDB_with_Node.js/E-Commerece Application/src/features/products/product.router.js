import express from "express";
import ProductController from "./product.controller.js";
import upload from "../../middlewares/file-upload.js";
// *Create Router Product
const productRouter = express.Router();

//*Create Instance of Product Controller
const productController = new ProductController();

//* Pass Request to the Controllers
productRouter.get("/", productController.getProducts);
productRouter.post("/add-product", upload.single("imageURL"), (req, res) => {
  productController.addProduct(req, res);
});
productRouter.get("/filter", productController.filterProducts);
productRouter.get("/:id", productController.getOneProduct);
productRouter.post("/rateProduct", productController.rateProduct);
//* Export Product Router
export default productRouter;
