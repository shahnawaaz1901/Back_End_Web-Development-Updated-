import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shaan.ansari1901@gmail.com",
    pass: "vcscjgdxnfcwvhah",
  },
});

const mailObject = {
  from: "shaan.ansari1901@gmail.com",
  to: "zh887033@gmail.com",
  subject: "Security Alert",
  text: "Hello Bro",
};

try {
  transporter.sendMail(mailObject);
  console.log("Mail Sent Successfully !");
} catch (error) {
  console.log(error);
}

const sendNotification = (email, reason) => {

};

export default sendNotification;
