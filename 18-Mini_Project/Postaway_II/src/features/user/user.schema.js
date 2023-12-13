import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: {
    type: String,
    requried: true,
    unique: true,
  },
  email: {
    match: [/.\+@\+./],
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    requried: true,
  },
  password: {
    type: String,
    required: true,
  },
});
