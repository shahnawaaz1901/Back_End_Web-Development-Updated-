export default class UserModel{
    constructor(_name, _email, _password){
        this.name = _name;
        this.email = _email;
        this.password = _password;
    }

    static addNewUser(user){
        const {name, email, password} = user;
        userDetails.push(new UserModel(name, email, password));
    }

    static authenticateUser(user){
        const result = userDetails.find((everyUser)=> user.email == everyUser.email && user.password == everyUser.password);
        return result;
    }
}

var userDetails = [new UserModel("Test User","test@ashu.com","test@123")];