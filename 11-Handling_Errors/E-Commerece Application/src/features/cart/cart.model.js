export default class CartModel {
  constructor(_id, _productId, _userId, _quantity) {
    this.productId = _productId;
    this.userId = _userId;
    this.quantity = _quantity;
    this.id = _id;
  }

  static addItemsToCart(productId, userId, quantity) {
    cartItems.push(
      new CartModel(cartItems.length + 1, productId, userId, quantity)
    );
    return cartItems;
  }

  static getAllCartItemsOfUser(userId) {
    const result = cartItems.filter((c) => c.userId == userId);
    return result;
  }

  static deleteItemFromCart(cartItemId, userId) {
    const itemIndex = cartItems.findIndex((c)=> c.id == cartItemId && c.userId == userId);
    if(itemIndex == -1){
        return "Item not Found";
    }else{
        cartItems.splice(itemIndex, 1);
    }
  }
}

var cartItems = [];
