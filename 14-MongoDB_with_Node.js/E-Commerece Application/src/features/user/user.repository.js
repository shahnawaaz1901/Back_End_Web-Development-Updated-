import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../errorHandler/application.error.js";

export default class UserRepository {
  constructor() {
    this.collection = "users";
  }
  //* Because this is Asynchronous and we async await instead of then catch
  /* 
    Always inside the repository we only receive one argument in object 
    form all object creation is done on the controller 
    */
  async signUp(newUser) {
    //* Always Do Database Related operation inside the try catch for proper error handling
    try {
      //1. Get DB
      const db = getDB();

      //2. Get Collection
      const collection = db.collection(this.collection);

      //3. Insert in the Document
      await collection.insertOne(newUser);
      return newUser;
    } catch (error) {
      throw new ApplicationError("Error While Inserion into Database", 500);
    }
  }

  /* Instead of Authenticate and Verify Details we need to find Out the Object  
  Authenticate User
  async signIn(email, password) {
    try {
        //1. Get DB
        const db = getDB();
    
        //2. Get Collection
        const collection = db.collection("users");
    
        //3. Insert in the Document
        return await collection.findOne({email, password});
    } catch (error) {
        throw new ApplicationError("Error While SignIn !!", 503);
    }
  }
  */
  async findByEmail(email) {
    //1. Get the Database
    const db = getDB();

    //2. Get the Collection
    const collection = db.collection(this.collection);

    //3. Find the UserObject with the email
    return await collection.findOne({ email });
  }
}
