import nodemailer from "nodemailer";

let smtpCredKaier = {
  host: "mail.kaisersemporium.com", // Replace with your SMTP server
  port: 25, // Replace with the port your SMTP server uses
  secure: false, // true for 465, false for other ports
  auth: {
    user: "battlegriffin@kaisersemporium.com", // Replace with your SMTP username
    pass: "behankaloda", // Replace with your SMTP password
  },
};

let mailTrapCred = {
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: "63d01a66a258fb3717234d764e1cf500",
  },
};

const sendMail = async function ({ from, to, subject, text, html }) {
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(mailTrapCred);

  let mailOptions = {
    from, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  };
  try {
    console.log("-------------------------Sending initiated");
    let info = await transporter.sendMail(mailOptions);
    console.log("-------------------------Message sent: %s", info.messageId);
    console.log(
      "-------------------------Preview URL: %s",
      nodemailer.getTestMessageUrl(info)
    );
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendMail;

// Example usage
