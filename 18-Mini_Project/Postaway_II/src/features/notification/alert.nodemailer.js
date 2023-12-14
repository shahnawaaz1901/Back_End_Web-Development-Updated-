import nodemailer from "nodemailer";

const alert = async (mailObject) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shaan.ansari1901@gmail.com",
      pass: "vcscjgdxnfcwvhah",
    },
  });

  try {
    await transporter.sendMail(mailObject);
    console.log("Mail Sent Successfully !");
  } catch (error) {
    console.log(error);
  }
};

const sendNotification = (email, reason) => {
  let obj = {
    from: "shaan.ansari1901@gmail.com",
    to: email,
  };

  if (reason == "Incorrect_Pass") {
    obj.subject = "Security Alert";
    obj.text = `You Have Just Entered Wrong Password On : ${new Date().toString()}`;
  }

  alert(obj);
};

export default sendNotification;
