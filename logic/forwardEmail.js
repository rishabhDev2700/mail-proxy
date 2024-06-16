import sendMail from "../mailman.js";
import CustomEmail from "./models/emails.js";

export default async function forwardEmail({
  fromEmail,
  receiverEmail,
  content,
}) {
  console.log(
    `Email received from ${fromEmail} at ${receiverEmail} is being forwarded to following email....`
  );

  let receiverID = getReceiverID(receiverEmail);

  console.log("receiverID", receiverID);

  let relation = await CustomEmail.findOne({ generatedEmailID: receiverID });

  if (!relation) return;

  if (!relation.customerEmailID) {
    relation.customerEmailID = fromEmail;
    await relation.save();
    await doSending(receiverEmail, relation.advertiserEmailID, content);
  } else {
    if (fromEmail == relation.advertiserEmailID) {
      await doSending(receiverEmail, relation.customerEmailID, content);
    } else {
      await doSending(receiverEmail, relation.advertiserEmailID, content);
    }
  }
}

function doSending(from, to, content) {
  console.log(`Forwarded to: ${to} from ${from}`);

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
