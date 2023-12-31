import nodemailer from "nodemailer";
const sendNotification = (email, reason) => {
  if (!email) {
    return;
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shaan.ansari1901@gmail.com",
      pass: "swwiknnhexalzbui",
    },
  });
  let mailSubject;
  let mailText;
  if (reason == "newUser") {
    mailSubject = "Welcome to Easily";
    mailText =
      "Welcome to Easily Job Portal Family. We are helping you to find the Best Talents of Our Country";
  } else if (reason == "login") {
    mailSubject = "Login Alert";
    mailText = `You Was Loggedin on ${Date().toString()}`;
  } else if (reason == "jobApply") {
    mailSubject = "Job Application Received";
    mailText =
      "Thankyou For Appllying a Job on Easily We Have Received Your Application and are Currently Reviewing it";
  }

  const mailOptions = {
    from: "shaan.ansari1901@gmail.com",
    name: "Shahnawaaz Ansari",
    to: email,
    subject: mailSubject,
    text: mailText,
  };

  try {
    const result = transporter.sendMail(mailOptions);
    console.log("Mail Sent Successfully !!");
  } catch (error) {
    console.log("Mail Not Sent , Internal Server Error !!");
  }
};

export default sendNotification;
