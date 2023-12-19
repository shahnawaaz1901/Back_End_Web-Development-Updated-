import sendMail from "./sendmail.nodemailer.js";

const wrongPasswordAlert = async (email, name) => {
  let obj = {
    from: "Shahnawaaz Ansari <shaan.ansari1901@gmail.com>",
    to: `${name} <${email}>`,
    subject: "Security Alert",
    text: `You Have Just Entered Wrong Password On : ${new Date().toString()}`,
  };
  sendMail(obj);
};

export default wrongPasswordAlert;
