export default class UsersModel {
  constructor(_id, _name, _email, _phone, _password) {
    this.id = _id;
    this.name = _name;
    this.email = _email;
    this.phone = _phone;
    this.passwrord = _password;
  }

  static newUser(userData) {
    
  }

  static existingUser(userData) {}
}

var usersData = [];
