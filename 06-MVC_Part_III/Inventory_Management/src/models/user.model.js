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
        console.log(usersDetails);
    }

    static isValidUser(email, password){
        let result = usersDetails.find((user) => console.log(user));
        console.log("Inside isValidUser Function !!");
        return result;
    }
}

var usersDetails = [];
usersDetails.push(new UserModel(usersDetails.length + 1,"Shahnawaaz Ansari","shaan.ansari1901@gmail.com", "A5FFC976"))