export default class UserModel{
    //*Constructor
    constructor(_id, _name, _email,_password){
        this.id = _id;
        this.name = _name;
        this.email = _email;
        this.password = _password
    }

    static addUser(name, email, password){
        usersDetails.push(new UserModel(usersDetails.length + 1,name, email, password));
    }

    static isValidUser(email, password){
        let result = usersDetails.find((user) => user.email == email && user.password == password);
        return result;
    }
}

var usersDetails = [];