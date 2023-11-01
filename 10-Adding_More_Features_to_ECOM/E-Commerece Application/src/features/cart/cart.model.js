export default class CartModel {
  constructor(_id, _productId, _userId, _quantity) {
    this.productId = _productId;
    this.userId = _userId;
    this.quantity = _quantity;
    this.id = _id;
  }

  static addItemsToCart(productId, userId, quantity){
    cartItems.push(new CartModel(cartItems.length + 1, productId, userId, quantity));
    return cartItems;
  }
}

var cartItems = [];
