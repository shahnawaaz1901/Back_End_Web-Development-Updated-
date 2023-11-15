let id = 1;
export default class UsersModel {
  constructor(_name, _email, _phone, _password) {
    this.id = id++;
    this.name = _name;
    this.email = _email;
    this.phone = _phone;
    this.password = _password;
  }

  static newUser(userData) {
    usersData.push(
      new UsersModel(
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

var usersData = [
  new UsersModel(
    "Shahnawaaz Ansari",
    "shaan.ansari1901@gmail.com",
    "9119145616",
    "A5FFC976"
  ),
];
