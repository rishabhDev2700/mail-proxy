import bodyParser from "body-parser";

import express from "express";
import forwardEmail from "./logic/forwardEmail.js";

const application = express();
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: true }));

application.post("/email", (req, res) => {
  console.log("got request");
  // logic for forwarding
  const data = req.body;
  const sender = data.from;
  const receiver = data.to;
  const subject = data.subject;
  const body = data.body;
  const text = "";

  //   sendEmail({
  //     from: `"Sender Name" <${sender}@example.com>`,
  //     to: `${receiver}@kaisersemporium.com`,
  //     subject: `${subject}`,
  //     text: `${text}`,
  //     html: `${body}`,
  //   });

  forwardEmail({
    fromEmail: sender,
    receiver: receiver[0],
    content: { subject, body, text },
  });
});

application.listen(3000, () => {
  console.log("Server is running on port 3000");
});
