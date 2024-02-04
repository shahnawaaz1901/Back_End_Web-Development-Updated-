import nodemailer from "nodemailer";

const sendMail = async (mailObject) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shaan.ansari1901@gmail.com",
      pass: "vcscjgdxnfcwvhah",
    },
  });

  try {
    await transport.sendMail(mailObject);
  } catch (error) {
    console.log("Mail not sent");
  }
};

export default sendMail;
