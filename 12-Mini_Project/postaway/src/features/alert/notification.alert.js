import nodemailer from "nodemailer";

const notificationAlert = async (receiverEmail, reasonForAlert) => {
  if (!receiverEmail || !reasonForAlert) {
    return;
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shaan.ansari1901@gmail.com",
      pass: "zurckfeeesikzdau",
    },
  });

  const mailObject = {
    from: "shaan.ansari1901@gmail.com",
    to: receiverEmail,
  };

  if (reasonForAlert == "new") {
    mailObject.subject = "Welcome";
    mailObject.text = "We Welcome you to our Postaway API Family.";
  } else {
    mailObject.subject = "Security Alert";
    mailObject.text = `We Have Noticed that You was logged in On : ${new Date().toString()}`;
  }

  try {
    await transporter.sendMail(mailObject);
    console.log("mail sent successfully !!");
  } catch (error) {
    console.log(error);
    console.log("mail not sent");
  }
};

export default notificationAlert;
