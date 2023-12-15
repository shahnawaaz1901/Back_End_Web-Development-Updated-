import nodemailer from "nodemailer";
import OTPGenerator from "../verification/otp.verification";

const sendOtp = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shaan.ansari1901@gmail.com",
      pass: "vcscjgdxnfcwvhah",
    },
  });

  const mailObject = {
    from: "shaan.ansari1901@gmail.com",
    to: email,
    subject: "no reply",
    text: `OTP for Reset Password on Postaway is : ${OTPGenerator.generateOTP()}`,
  };
  try {
    await transporter.sendMail(mailObject);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default sendOtp;
