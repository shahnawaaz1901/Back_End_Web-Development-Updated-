import ProductModel from "./product.model.js";
import path from 'path';
export default class ProductController {
  //* Get All Products
  getProducts(req, res) {
    const product = ProductModel.getAll();
    res.status(200).send(product);
  }

  //* Add New Product
  addProduct(req, res) {
    console.log(req.body);
    const { name, price, sizes } = req.body;
    const imageURL = req.file.filename;
    const newProduct = {
        name,
        price : parseFloat(price),
        sizes : sizes.split(','),
        imageURL,
    }
    ProductModel.addProduct(newProduct);
    res.send(ProductModel.getAll());
    // res.send("Your Post Request is Received !! Very ThankYou");
  }

  //* Get Product by ID
  getProductById(req, res) {}

  //* Rate the Product
  rateProduct(req, res) {}
}
