export default class OrderModel {
  constructor(_userId, _amount) {
    this.userId = _userId;
    this.amount = _amount;
    this.time = new Date();
  }
}
