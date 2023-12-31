export default class ProductModel {
  constructor(_id, _name, _description, _price, _imageURL) {
    this.id = _id;
    this.name = _name;
    this.description = _description;
    this.price = _price;
    this.imageURL = _imageURL;
  }

  /*
    Static KeyWord Helps us to use a function which is inside a class withOut 
    Creating Object of that Class. We Can Only Use those functions withOut
    creating an instance of that Class, function which is Creating using 
    static keyword
    */
  static getProducts() {
    return products;
  }
}

var products = [
  new ProductModel(
    1,
    "Atomic Habits",
    "A supremely practical and useful book.",
    300,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg"
  ),
  new ProductModel(
    2,
    "Ikigai",
    "The Japanese secret to a long and happy life",
    340,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg"
  ),
  new ProductModel(
    3,
    "Deep Work",
    "RULES FOR FOCUSED SUCCESS IN A DISTRACTED WORLD",
    280,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg"
  ),
];
