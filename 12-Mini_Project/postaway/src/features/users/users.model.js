export default class UsersModel {
  constructor(_id, _name, _email, _phone, _password) {
    this.id = _id;
    this.name = _name;
    this.email = _email;
    this.phone = _phone;
    this.password = _password;
  }

  static newUser(userData) {
    usersData.push(
      new UsersModel(
        usersData.length + 1,
        userData.name,
        userData.email,
        userData.phone,
        userData.password
      )
    );
    return "User Ragistered Successfully ..";
  }

  static existingUser(userData) {
    const result = usersData.find(
      (u) =>
        (u.email == userData.email || u.phone == userData.phone) &&
        u.password == userData.password
    );
    return result;
  }

  static getAllUsers() {
    return usersData;
  }
}

var usersData = [];
