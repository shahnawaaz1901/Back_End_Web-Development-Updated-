export default class ProductModel {
  constructor(_name, _description, _price, _imageURL, _category, _sizes) {
    this.name = _name;
    this.description = _description;
    this.imageURL = _imageURL;
    this.price = _price;
    this.category = _category;
    this.sizes = _sizes;
  }
}
