import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
export default class UserController {
  constructor() {
    //* Create userRepository Instance While Creating an Instance
    this.userRepository = new UserRepository();
  }

  //* SignUp
  async signUp(req, res) {
    const { name, email, password, typeOfUser } = req.body;
    const newUser = new UserModel(name, email, password, typeOfUser);
    const user = await this.userRepository.signUp(newUser);
    res.status(201).send(user);
  }

  //* SignIn
  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.userRepository.signIn(email, password);
      const token = jwt.sign(
        { userId: result._id, email: result.email },         //* Pass Object id and email
        "2PLVo2mvL3BGWhcSlfbL",
        { expiresIn: "1h" }
      );
      res.cookie("token", token).status(200).send(token);
    } catch (error) {
      res.status(400).send("Invalid Credentials , Please Try Again!!");
    }
  }
}
