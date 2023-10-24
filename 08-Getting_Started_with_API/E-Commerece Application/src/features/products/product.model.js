export default class ProductModel {
  constructor(_id, _name, _description, _imageURL, _category, _price, _sizes) {
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
}

var products = [
    new ProductModel(1,"Product 1","Description for Product 1"),
    new ProductModel(2,"Product 2","Description for Product 2"),
    new ProductModel(3,"Product 3","Description for Product 1"),
];
