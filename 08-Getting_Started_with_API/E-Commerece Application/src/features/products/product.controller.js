import ProductModel from "./product.model.js";
export default class ProductController {
  //* Get All Products
  getProducts(req, res) {
    const product = ProductModel.getAll();
    res.status(200).send(product);
  }

  //* Add New Product
  addProduct(req, res) {
    console.log(req.body);
    console.log("This is a Post Request !!");
    res.send("Your Post Request is Received !! Very ThankYou");
  }

  //* Get Product by ID
  getProductById(req, res) {}

  //* Rate the Product
  rateProduct(req, res) {}
}
