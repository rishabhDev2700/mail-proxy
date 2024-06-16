import bodyParser from "body-parser";

import express from "express";
import forwardEmail from "./logic/forwardEmail.js";
import sendMail from "./mailman.js";

const application = express();
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: true }));

// sendEmail({
//   from: `"Sender Name" <${sender}@example.com>`,
//   to: `${receiver}@kaisersemporium.com`,
//   subject: `${subject}`,
//   text: `${text}`,
//   html: `${body}`,
// });

console.log("------------------------------------Sending test email....");

// sendMail({
//   from: '"Kaisers Emporium" <nikhil@kaisersemporium.com>',
//   // to: 'rishavkumar2700@gmail.com',
//   // to: "rishabhdev2700@gmail.com",
//   to: "arnav010singh@gmail.com",
//   subject: "App is working.....",
//   text: "Welcome to kaisersemporium",
//   html: "<b>This is from nikhil to check thread?</b>",
// });

application.post("/email", (req, res) => {
  console.log("got request");
  // logic for forwarding
  const data = req.body;
  const sender = data.from;
  const receiver = data.to;
  const subject = data.subject;
  const body = data.body;
  const text = "";

  forwardEmail({
    fromEmail: sender,
    receiver: receiver[0],
    content: { subject, body, text },
  });
});

application.listen(3000, () => {
  console.log("Server is running on port 3000");
});
