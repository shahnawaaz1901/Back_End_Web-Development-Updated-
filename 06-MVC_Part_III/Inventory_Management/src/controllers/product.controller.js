import path from "path"; // Import Using ES6 Module
import ProductModel from "../models/product.model.js";

// Export Products Controller class Default
let products = ProductModel.getProducts();
export default class ProductsController {
  // First Function
  getProduct(req, res) {
    res.render("products", {
      title: "Products Page",
      products, // Send the products array along with file
    });
  }

  getAddProductForm(req, res) {
    res.render("new-product", {
      title: "Add New Product",
      errorMassages: null,
    });
  }

  addNewProducts(req, res) {
    const { name, desc, price} = req.body;                          //*Extract three values from body
    console.log(req.file);
    const imageURL = path.join("images",req.file.filename);         //*Extract Image name from file Object
    ProductModel.addProduct(name, desc, price, imageURL);
    products = ProductModel.getProducts();
    res.render("products", {
      title: "Products",
      products,
    });
  }

  getUpdateProductView(req, res, next) {
    // Check Whether id is Present or Not
    let id = req.params.id;
    const productIndex = ProductModel.getById(id);
    let productArray = ProductModel.getProducts();
    if (productIndex != -1) {
      res.status(202).render("update-product", {
        title: "Update Product",
        product: productArray[productIndex],
        errorMassages: null,
      });
    }
    // *!If Product Not Found
    else {
      res.status(401).send("Product Not Found");
    }
  }

  postUpdateProduct(req, res) {
    ProductModel.update(req.body);
    res.render("products", {
      title: "Products",
      products: ProductModel.getProducts(),
    });
  }

  deleteProduct(req, res) {
    let id = req.params.id;
    console.log(id);
    let productFound = ProductModel.getById(id);
    if (productFound == -1) {
      return res.status(401).send("Product Not Found");
    }
    ProductModel.delete(id);
    res.render("products", {
      products: ProductModel.getProducts(),
      title: "Products",
    });
  }
}
