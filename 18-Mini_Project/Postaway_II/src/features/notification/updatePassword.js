import sendMail from "./sendmail.nodemailer.js";

const updatePasswordAlert = async (email, name) => {
  const obj = {
    from: "Shahnawaaz Ansari <shaan.ansari1901@gmail.com>",
    to: `${name} <${email}>`,
    subject: "Password Updated",
    text: `You Have Recently Changed Your Password on Postaway at ${new Date().toString()}`,
  };

  await sendMail(obj);
};

export default updatePasswordAlert;
