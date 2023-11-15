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
    const { name, email, password, typeOfUser } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel(
      name,
      email,
      //* password, instead of Create Object in Plain password using the hashpassword
      hashPassword, //* HashPassword Instead of Plain text Password
      typeOfUser
    );
    const user = await this.userRepository.signUp(newUser);
    res.status(201).send(user);
  }

  //* SignIn
  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      //* Find the UserObject with the email address which user Provides
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return res.status(400).send("Invalid Credentials , Please Try Again!!");
      } else {
        //* if w reach else means user if found by email now compare the password
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          //* Password is Match
          const token = jwt.sign(
            { userId: user._id, email: user.email }, //* Pass Object id and email
            process.env.JWT_Secret,
            { expiresIn: "1h" }
          );
          return res.cookie("token", token).status(200).send(token);
        } else {
          return res.status(404).send("Please Enter a Valid Password !!");
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something Went Wrong !!");
    }
  }
}
