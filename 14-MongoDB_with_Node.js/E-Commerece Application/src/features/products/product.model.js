import ApplicationError from "../errorHandler/application.error.js";
import UserModel from "../user/user.model.js";
export default class ProductModel {
  constructor(_name, _description, _price, _imageURL, _category, _sizes) {
    this.name = _name;
    this.description = _description;
    this.imageURL = _imageURL;
    this.price = _price;
    this.category = _category;
    this.sizes = _sizes;
  }

  static filter(minPrice, maxPrice, category) {
    const filterData = products.filter((product) => {
      return (
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice) &&
        (!category || product.category == category)
      );
    });
    if (!filterData) {
      throw new ApplicationError("Sorry No Products Found !!", 404);
    }
    return filterData;
  }

  static rateProduct(userId, productId, rating) {
    const userResult = UserModel.getAllUserDetails().find(
      (user) => user.id == userId
    );
    /* 
      For Proper Error Handling We Need to throw an error if user not found 
      or product not found this error is caught by the try catch block so 
      that our server handle the proper handling
    */
    //* User Define Error
    if (!userResult) {
      throw new ApplicationError("User Not Found !!", 404);
      /*
        throw new Error("User not Found !!")
        Instead of Send Directly Error We Need to Send the Custom Error with the
        help of our custom class which Also Contains the error status code along
        with error message 
      */
    }

    const productResult = this.getAll().find((p) => p.id == productId);
    //* User Define Error
    if (!productResult) {
      /* 
        Error Which we Pass Inside the Error Contructor is Received in error
        object of catch where our error received in massage because that object
        contains three things name, massage and stack 
      */
      throw new ApplicationError("Product Not Found !!", 404);
    }

    //* If Ratings not Given By the User
    if (!productResult.ratings) {
      productResult.ratings = [];
      productResult.ratings.push({
        userId: userId,
        rating: rating,
      });
    }
    //* If Ratings Already Exist Check if User Which Want to Rate, Rated the Product Previously
    else {
      const userRatingsIndex = productResult.ratings.findIndex(
        (p) => p.userId == userId
      );
      if (userRatingsIndex >= 0) {
        productResult.ratings[userRatingsIndex] = {
          userId: userId,
          rating: rating,
        };
      }
      //* If Rating Not Exist
      else {
        productResult.ratings.push({
          userId: userId,
          rating: rating,
        });
      }
    }
  }
}

var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    2400,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "Category1",
    ["S", "M", "L", "XL"]
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    3566,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    "Category2",
    ["S", "M", "L", "XL"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 1",
    6454,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    "Category3",
    ["S", "M", "L", "XL"]
  ),
];
