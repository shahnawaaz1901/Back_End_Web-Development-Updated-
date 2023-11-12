//* Import getDB to Use Database for our User Model
import { getDB } from "../../config/mongodb.js";
/* 
  On One Database we server we have multiple databases and every database 
  we have multiple collections and in every collection we have multiple documents 
*/

export default class UserModel {
  //* Constructor
  constructor(_name, _email, _password, _typeOfUser) {
    this._id;
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.typeOfUser = _typeOfUser;
  }

  //* Create New User By using then catch
  /*
  static signUp(name, email, password, typeOfUser) {
    //* 1. Get the Database
    const db = getDB();

    //* 2. Get the Collections of Users from the database
     
      If our Collection not Present in Database then it will be taken 
      care by the software of server  
    
    const collection = db.collection("users");

     
      Because now we use the database mongodb so that we dont need to store 
      data into the array not vary about the id because id is taken care by 
      the mongodb, which generate a 12 byte unique id when a document is inserted
    
    //* 3. Insert the Document in Collection
    //* Create Document
    const obj = {
      name,
      email,
      password,
      typeOfUser,
    };
    
      insertOne function returns a promise and because this is returns a promise so 
      that we can use either then catch or async await inside the try catch for error
      handling, after the insertion object we insert into the database is changed with
      document of collection which we can seen by printing the document which contains
      the object Id which is similar which we can see into the mongodbcompass
    
    collection
      .insertOne(obj)
      .then(() => console.log(obj))
      .catch((err) => console.log(err));
  }
  */
  //* Because this is Asynchronous and we async await instead of then catch
  static async signUp(name, email, password, typeOfUser) {
    //* Create the New User Using UserModel
    const newUser = new UserModel(name, email, password, typeOfUser);
    //* Always Do Database Related operation inside the try catch for proper error handling
    try {
      
      //1. Get DB
      const db = getDB();
      
      //2. Get Collection
      const collection = db.collection("users");
      
      //3. Insert in the Document
      await collection.insertOne(newUser);
      return newUser;
    } catch (error) {
      console.log('Error While Inserting Data into the Database !!')
    }
  }
  //* Authenticate User
  static signIn(email, password) {
    const result = userDetails.find(
      (user) => user.email == email && user.password == password
    );
    return result;
  }

  //* Get All User Data
  static getAllUserDetails() {
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
