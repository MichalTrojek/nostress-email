const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'wes1-smtp.wedos.net',
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: 'test@skladovypomocnik.cz',
    pass: 'Wedosemail1+',
  },
});

var message = {
  from: 'test@skladovypomocnik.cz',
  to: 'michaltrojek1@gmail.com',
  subject: 'Message title',
  text: 'Plaintext version of the message',
  html: '<p>HTML version of the message</p>',
};

transporter.sendMail(message, (err, info) => {
  console.log('called');
  if (err) {
    console.log(`Error while sending an email ${err}`);
  }
  console.log('info ', info);
});
