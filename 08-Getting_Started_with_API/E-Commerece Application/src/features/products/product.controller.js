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
  getOneProduct(req, res) {
    const id = req.params.id;
    const product = ProductModel.getProductById(id);
    if(!product){
      res.status(404).send("Product not Found !!");
    }else{
      res.status(200).send(product);
    }
  }

  //* Filter Products
  filterProducts(req, res){
    //* All Query Parameters data is inside the request.query Object
    console.log(req.query);
    const {minPrice, maxPrice, category} = req.query;
    const result = ProductModel.filter(minPrice, maxPrice, category);
    if(!result){
      res.status(404).send("Sorry No Products Found !!");
    }else{
      res.status(200).send(result);
    }
  }

  //* Rate the Product
  rateProduct(req, res) {}
}
