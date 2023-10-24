export default class ProductModel {
  constructor(_id, _name, _description, _price, _imageURL, _category, _sizes) {
    this.id = _id;
    this.name = _name;
    this.description = _description;
    this.imageURL = _imageURL;
    this.price = _price;
    this.category = _category;
    this.sizes = _sizes;
  }

  static getAll() {
    return products;
  }

  static addProduct(product){
    products.push(products.length + 1, product.name, "New Product",product.price,product.imageURL,`Category ${products.length + 1}`,product.sizes);
  }
}

var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    2400,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "Category 1",
    ["S","M","L","XL"]
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    3566,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    "Category 2",
    ["S","M","L","XL"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 1",
    6454,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    "Category 3",
    ["S","M","L","XL"]
  ),
];
