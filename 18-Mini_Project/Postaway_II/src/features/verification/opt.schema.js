import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: String,
  otp: Number,
});

const OTPModel = mongoose.model("OTP", otpSchema);
export default OTPModel;
