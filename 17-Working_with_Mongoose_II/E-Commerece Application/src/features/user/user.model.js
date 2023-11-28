//* Import getDB to Use Database for our User Model

export default class UserModel {
  //* Constructor
  constructor(_name, _email, _password, _typeOfUser) {
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.typeOfUser = _typeOfUser;
  }
}
