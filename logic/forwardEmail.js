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
  console.log(`Forwarded to: ${to}`);

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
