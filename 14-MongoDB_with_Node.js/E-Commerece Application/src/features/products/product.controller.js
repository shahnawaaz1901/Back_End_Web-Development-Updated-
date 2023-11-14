import ApplicationError from "../errorHandler/application.error.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  //* Get All Products
  async getProducts(req, res) {
    try {
      const result = await this.productRepository.getAll();
      res.status(200).send(result);
    } catch (error) {
      throw new ApplicationError("Something went Wrong", 500);
    }
  }

  //* Add New Product
  async addProduct(req, res) {
    try {
      const { name, price, sizes } = req.body;
      const newProduct = new ProductModel(
        name,
        "New Product Description",
        parseFloat(price),
        req.file.filename,
        "Category 1",
        sizes.split(",")
      );

      const product = await this.productRepository.add(newProduct);
      res.status(201).send(product);
    } catch (error) {
      throw new ApplicationError("Something went Wrong", 500);
    }
  }

  //* Get Product by ID
  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      const result = await this.productRepository.getOne(id);
      res.status(200).send(result);
    } catch (error) {
      throw new ApplicationError("Something Went Wrong", 500);
    }
  }

  //* Filter Products
  async filterProducts(req, res) {
    const result = await this.productRepository.filter(req.query);
    res.status(200).send(result);
  }

  //* Rate the Product
  async rateProduct(req, res) {
    const { productId, rating } = req.query;
    const userObject = {
      productId,
      rating,
      userId: req.userId,
    };
    /* 
      Instead of send an error string our rate product function throw an error
      so that we need to call rate product function into the try catch so that
      out rate product product function thrown an error our server not stopped
    */
    /*
    try {
      ProductModel.rateProduct(userId, productId, rating);
    } catch (error) {
      return res.status(400).send(error.message);
    }
    return res.status(200).send("Product Rated Successfully !!");
    */
    /* 
      Because we Use Application Level Error Handler We Dont need here to handle 
      the Error in try catch  
    */
    /* 
      We Can Also Use this Method Also Using try Catch on Every Controller Function 
      try {
        ProductModel.rateProduct(userId, productId, rating);
        return res.status(200).send("Product Rated Successfully !!");
      } catch (error) {
        next(error)         //* If this next function call along with error then it directy call Our Application Level Error Handler 
      }
    */
    await this.productRepository.rate(userObject);
    return res.status(200).send("Product Rated Successfully !!");
  }
}
