const nodemailer = require('nodemailer');

const SENDER_ADDRESS = 'test@skladovypomocnik.cz';

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function sendEmail(message) {
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(`Error while sending an email ${err}`);
    }
    console.log('info ', info);
  });
}

function sendEmailOrderReceivedTo(recipientAddress) {
  const message = {
    from: SENDER_ADDRESS,
    to: recipientAddress,
    subject: 'Objednávka byla odeslána',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>',
  };
  sendEmail(message);
}

function sendEmailOrderConfirmedTo(recipientAddress) {
  const message = {
    from: SENDER_ADDRESS,
    to: recipientAddress,
    subject: 'Objednávka byla potvrzena',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>',
  };
  sendEmail(message);
}

module.exports = { sendEmailOrderReceivedTo, sendEmailOrderConfirmedTo };
