import OTPGenerator from "../verification/otp.verification.js";
import sendMail from "./sendmail.nodemailer.js";

const sendOtp = async (email, name) => {
  const mailObject = {
    from: "Shahnawaaz Ansari <shaan.ansari1901@gmail.com>",
    to: `${name} <${email}>`,
    subject: "no reply",
    text: `OTP for Reset Password on Postaway is : ${OTPGenerator.generateOTP(
      email
    )}`,
  };

  await sendMail(mailObject);
};
export default sendOtp;
