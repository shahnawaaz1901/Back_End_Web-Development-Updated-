import ProductModel from "./product.model.js";
export default class ProductController {
  //* Get All Products
  getProducts(req, res) {
    const product = ProductModel.getAll();
    res.status(200).send(product);
  }

  //* Add New Product
  addProduct(req, res) {}

  //* Get Product by ID
  getProductById(req, res) {}

  //* Rate the Product
  rateProduct(req, res) {}
}
