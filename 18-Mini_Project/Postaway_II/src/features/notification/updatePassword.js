import sendMail from "./sendmail.nodemailer";

const obj = {
  to: email,
  from: "shaan.ansari1901@gmail.com",
  subject: "Password Updated",
  text: `You Have Recently Changed Your Password on Postaway at ${new Date().toString()}`,
};

await sendMail(obj);
