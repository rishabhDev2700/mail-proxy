import nodemailer from 'nodemailer';

const sendMail = async function ({ from, to, subject, text, html }) {
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
     
    });
    let mailOptions = {
        from, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
    };
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


sendMail({
    from: '"Kaisers Emporium" <nikhil@kaisersemporium.com>',
    // to: 'rishavkumar2700@gmail.com',
    // to: "rishabhdev2700@gmail.com",
    to:"arnav010singh@gmail.com",
    subject: 'App mailing system',
    text: 'Welcome to kaisersemporium',
    html: '<b>This is from nikhil to check thread?</b>',
});
exports.sendMail = sendMail;
// Example usage
