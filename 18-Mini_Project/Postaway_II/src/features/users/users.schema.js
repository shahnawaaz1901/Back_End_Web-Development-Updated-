import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    // match: [/.+\.@+\.+\./, "Please Enter Valid Email format"],
    required: true,
    unique: true
  },
  age: {
    type: Number,
    min: [0, "Age Should be Greater then 0"],
    max: [100, "Age Should be less then 100"],
    // required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  }
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
