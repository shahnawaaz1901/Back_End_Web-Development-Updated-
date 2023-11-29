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
      let { name, description, price, sizes, categories, stock } = req.body;
      const imageURL = req.file.filename;
      console.log(imageURL);
      categories = categories.split(",");
      console.log(categories);
      const newProduct = {
        name,
        image : imageURL,
        description,
        price: parseFloat(price),
        stock,
        categories,
        sizes: sizes.split(","),
      };

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
    try {
      const result = await this.productRepository.filter(req.query);
      res.status(200).send(result);
    } catch (error) {
      throw new ApplicationError("Somthing Went Wrong ", 500);
    }
  }

  //* Rate the Product
  async rateProduct(req, res) {
    try {
      const { productId, rating } = req.body;
      const userObject = {
        productId,
        rating,
        userId: req.userId,
      };
      await this.productRepository.rate(userObject);
      return res.status(200).send("Product Rated Successfully !!");
    } catch (error) {
      res.status(500).send("Something went Wrong");
    }
  }

  async getAveragePrice(req, res) {
    try {
      const result = await this.productRepository.avgPrice();
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something Went Wrong", 500);
    }
  }

  async getAverageRatings(req, res) {
    try {
      const result = await this.productRepository.avgRatings();
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something Went Wrong ", 500);
    }
  }
}
