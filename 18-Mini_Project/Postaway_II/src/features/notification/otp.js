import OTPGenerator from "../verification/otp.verification.js";
import sendMail from "./sendmail.nodemailer.js";

const mailObject = {
  from: "shaan.ansari1901@gmail.com",
  to: email,
  subject: "no reply",
  text: `OTP for Reset Password on Postaway is : ${OTPGenerator.generateOTP()}`,
};

await sendMail(mailObject);
export default sendOtp;
