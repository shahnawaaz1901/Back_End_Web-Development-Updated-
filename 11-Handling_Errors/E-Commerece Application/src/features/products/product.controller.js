import ProductModel from "./product.model.js";
import path from "path";

export default class ProductController {
  //* Get All Products
  getProducts(req, res) {
    const product = ProductModel.getAll();
    res.status(200).send(product);
  }

  //* Add New Product
  addProduct(req, res) {
    const { name, price, sizes } = req.body;
    const imageURL = req.file.filename;
    const newProduct = {
      name,
      price: parseFloat(price),
      sizes: sizes.split(","),
      imageURL,
    };
    ProductModel.addProduct(newProduct);
    res.send(ProductModel.getAll());
  }

  //* Get Product by ID
  getOneProduct(req, res) {
    const id = req.params.id;
    const product = ProductModel.getProductById(id);
    if (!product) {
      res.status(404).send("Product not Found !!");
    } else {
      res.status(200).send(product);
    }
  }

  //* Filter Products
  filterProducts(req, res) {
    const { minPrice, maxPrice, category } = req.query;
    const result = ProductModel.filter(minPrice, maxPrice, category);
    if (!result) {
      res.status(404).send("Sorry No Products Found !!");
    } else {
      res.status(200).send(result);
    }
  }

  //* Rate the Product
  rateProduct(req, res) {
    const { productId, rating } = req.query;
    const userId = req.userId;
    /* 
      Instead of send an error string our rate product function throw an error
      so that we need to call rate product function into the try catch so that
      out rate product product function thrown an error our server not stopped
    */
    try {
      ProductModel.rateProduct(userId, productId, rating);
    } catch (error) {
      return res.status(400).send(error.message);
    }
    return res.status(200).send("Product Rated Successfully !!");
  }
}
