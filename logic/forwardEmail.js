import CustomEmail from "./models/emails";
import { sendMail } from "../mailman";

export default async function forwardEmail(fromEmail, receiverEmail, content) {
    let reciverID = getReceiverID(receiverEmail);

    let relation = await CustomEmail.findOne({ generatedEmailID: reciverID });

    if (!relation) return;

    if (!relation.customerEmail) {
        relation.customerEmail = fromEmail;
        await relation.save();
        await doSending(receiverEmail, relation.advertiserEmail, content);
    } else {
        if (fromEmail == relation.advertiserEmail) {
            await doSending(receiverEmail, relation.customerEmail, content);
        } else {
            await doSending(receiverEmail, relation.advertiserEmail, content);
        }
    }
}

function doSending(from, to, content) {

    sendMail({
        from: `"Sender Name" <${from}>`,
        to: to,
        subject: `${content.subject}`,
        text: `${content.text}`,
        html: `${content.body}`,
    });
}

function getReceiverID(theEmail) {
    let split = theEmail.split("@");
    return split[0];
}

