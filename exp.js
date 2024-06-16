import express from 'express';
import bodyparser from 'body-parser';
import sendEmail from './mailman';

const application = express();
application.use(bodyparser.json());
application.use(bodyparser.urlencoded({ extended: true }));

application.post("/email", (req, res) => {
    console.log('got request')
    // logic for forwarding
    const data = req.body
    const sender = data.from;
    const receiver = data.to;
    const subject = data.subject;
    const body = data.body;
    const text = "";

    sendEmail({
        from: `"Sender Name" <${sender}@example.com>`,
        to: `${receiver}@kaisersemporium.com`,
        subject: `${subject}`,
        text: `${text}`,
        html: `${body}`,
    });

    forwardEmail()

})

application.listen(3000, () => {
    console.log("Server is running on port 3000");
})