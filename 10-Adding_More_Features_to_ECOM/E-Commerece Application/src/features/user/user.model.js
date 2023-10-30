export default class UserModel {
  //* Constructor
  constructor(_id, _name, _email, _password, _typeOfUser) {
    this.id = _id;
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.typeOfUser = _typeOfUser;
  }

  //* Create New User
  static signUp(name, email, password, typeOfUser) {
    userDetails.push(
      new UserModel(userDetails.length + 1, name, email, password, typeOfUser)
    );
  }

  //* Authenticate User
  static signIn(email, password) {
    const result = userDetails.find(
      (user) => user.email == email && user.password == password
    );
    return result;
  }

  //* Get All User Data
  static getAllUserDetails(){
    return userDetails;
  }
}

var userDetails = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@ecom.in",
    password: "admin@1234",
    typeOfUser: "admin",
  },
];
