import sendMail from "./sendmail.nodemailer.js";

const wrongPasswordAlert = async (email) => {
  let obj = {
    from: "shaan.ansari1901@gmail.com",
    to: email,
    subject: "Security Alert",
    text: `You Have Just Entered Wrong Password On : ${new Date().toString()}`,
  };
  sendMail(obj);
};

export default wrongPasswordAlert;
