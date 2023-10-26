import express from "express";
import ProductController from "./product.controller.js";
import upload from "../../middlewares/file-upload.js";
// *Create Router Product
const ProductRouter = express.Router();

//*Create Instance of Product Controller
const productController = new ProductController();

/* 
    If Some Request Comes Here then it means that request already pass 
    /api/products/ route so We use the default path for Get all Product
    Page
*/

/* 
    Here We Write the Request type instead of writing use it means our 
    request route is Ends Here and Now Request is Go for Controller
*/
ProductRouter.get("/", productController.getProducts);
ProductRouter.post(
  "/add-product",
    //   We Can Also Use upload.array() which is Used to Upload multiple files
  upload.single("imageURL"),
  productController.addProduct
);
/* 
  For filter Instead of Making Post Request We Can Use query parameters which is
  Almost Same as root parameters query parameters URL looks like :

  localhost:3200/api/products/filter?minPrice=15&maxPrice=20&category=Category1
*/
ProductRouter.get("/filter",productController.filterProducts);
/* Always Request Parameters Router is bottom at Router Position */
ProductRouter.get("/:id",productController.getOneProduct);

//* Export Product Router
export default ProductRouter;
