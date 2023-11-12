//* Import getDB to Use Database for our User Model
import { getDB } from "../../config/mongodb.js";
/* 
  On One Database we server we have multiple databases and every database 
  we have multiple collections and in every collection we have multiple documents 
*/

export default class UserModel {
  //* Constructor
  constructor(_name, _email, _password, _typeOfUser) {
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
  /* 
          In Our this module user.model.js we do two things but its not correct 
          because if we work on big project every module do only One thing in this 
          module we do two things we use class for creating an object and as well 
          as we put data inside the database in this module this is not right approach, 
          this approach works in small application but its hard to maintain code 
          in major application, for this we need to create a module called repository
          in which we do all database related operations. Advantage of this is Sepration
          of Concerns means we seprate the workload into the different Modules. for this
          we need to create a file name users.repository.js in which we do all things
        */

  //* not Required because we use Database
  /* Get All User Data
  static getAllUserDetails() {
    return userDetails;
  }*/
}
/* Not Required because we use Database
var userDetails = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@ecom.in",
    password: "admin@1234",
    typeOfUser: "admin",
  },
];
 */