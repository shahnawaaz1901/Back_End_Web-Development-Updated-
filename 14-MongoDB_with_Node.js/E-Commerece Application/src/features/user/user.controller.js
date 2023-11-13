import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
export default class UserController {
  constructor() {
    //* Create userRepository Instance While Creating an Instance
    this.userRepository = new UserRepository();
  }

  //* SignUp
  async signUp(req, res) {
    /* 
      We Created Object as it is means we directly store password in plain text 
      this is dangerous because developer can see password of users, instead of 
      directly storing in plain text we need to encrypt or hash the password so
      that is anyone can see user password he/she can't understand, because pass-
      word is in hash form. For this hashing we can use a library called bcrypt
      which helps us to generate a hash password from a plain text. 
    */
    const { name, email, password, typeOfUser } = req.body;
    /* 
      hashing function available in both synchronous and asynchronous operations but we
      use asynchronous function to generate hashPassword but we can use synchronous as 
      well by writing Sync after the hash like this
      const hashPassword = bcrypt.hashSync;
    */
    const hashPassword = await bcrypt.hash(password, 12);
    /* 
      First Argument is password which we want to hash and next argument is round or 
      salt, salt is a random number which helps us to differenciate when two users
      use same password, so that password is cracked by bruteforce attacks, so preventing
      this kind of situation we need to provide a salt number, salt number which we can
      provide is range between 0 to number which we provide, hash function pick number
      between the range and use that number in hashing so that hashpassword becomes unique
      One thing is if we provide large number in salt then it'll take time to generate
      the hashPassword so that when we provide the salt number keep in mind .   
    */
    const newUser = new UserModel(
      name, 
      email, 
      //* password, instead of Create Object in Plain password using the hashpassword 
      hashPassword,             //* HashPassword Instead of Plain text Password
      typeOfUser
    );
    const user = await this.userRepository.signUp(newUser);
    res.status(201).send(user);
  }

  //* SignIn
  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.userRepository.signIn(email, password);
      const token = jwt.sign(
        { userId: result._id, email: result.email }, //* Pass Object id and email
        "2PLVo2mvL3BGWhcSlfbL",
        { expiresIn: "1h" }
      );
      res.cookie("token", token).status(200).send(token);
    } catch (error) {
      res.status(400).send("Invalid Credentials , Please Try Again!!");
    }
  }
}
