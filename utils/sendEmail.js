const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other like Mailtrap, etc.
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

const mailOptions = {
    from: `"My CMS" <${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    text,
    // html, // if i want to send html in email then use it .
};


await transporter.sendMail(mailOptions);
    

module.exports = sendEmail;