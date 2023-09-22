/*
    Nodemailer is a package which helpe you to send email the user to 
    authenticate or done any kind of operation which is done using email
*/

// Nodemailer is Package or external Module so we need to install first then import
const nodemailer = require('nodemailer');

// NodeMailer is Work on Asynchrnous so we write async before
async function sendMail(){
    /* 1. Create an Email Transporter
        Using Protocol SMTP (Simple Mail Transfer Protocol), to send mail
    */
    const transporter = nodemailer.createTransport({                  // Create a Transporter to send emails
        /*
            Define Which Service You Want to Use. Here Service Means Who is the
            Service Provider of Your email which you use to send emails, here we
            use google's gmail service so we write
        */
        service : 'gmail',              
        auth : {                        // Define Which User You Want to Send Email
            user : 'shaan.ansari1901@gmail.com',            // Define User Email Address Where From You Want to send Email
            /* 
                This is not login password this password is given by service 
                provider gmail to us in 2 factor authentication Section 
            */
            pass : 'tvjcwzvcxozfqppj',
        }
        // Transporter is Set
    }); 


    /*
        We Use this Above Transporter to send the email, but before send we need
        to write details which we write basically to send the email normally in gmail.
    */
    // 2. Configure Email Content
    const mailOptions = {                   // Object Which Contains all details from to bcc cc and content of email
        from : 'shaan.ansari1901@gmail.com',            // Sender Email(Email Which You Want to send mails)
        to : 'sahilhussain395@gmail.com',                // Receiver Email (Email Where you Receive Emails)
        subject : 'Email Send From NodeJS',
        text : 
        `
        Kade teri kasam ye email Node.Js Use Kar Ke Bhejra hu.
        Bhale hi Link de du check kr liyo .
        Jaldi se Plot K Kagaz Mujhe de de Warna RiverFront Tmhare Tmhare Plot p Gira dunga
        ScreenShot Link : https://drive.google.com/file/d/17kcb3XJGDJGNd80XwCqPPfTHxFuyT1Cn/view?usp=sharing
        `,
    }

    //3. Use Transporter to Send Email 
    /*
        Always Write Send Email Function with in try catch so that if any reason our
        protocol server is down , or email is incorrect or any other reason our server
        not crashed
    */
    try {
        // Because asynchronous operation we want to wait until mail is sent or not
        const result = await transporter.sendMail(mailOptions);            
        console.log('Email is Sent Successfully !!');
    } catch (error) {
        console.log(`Error : ${error}`);
    }
}

sendMail();