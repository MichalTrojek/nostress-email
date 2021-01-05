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
      console.log(`Error while sending an email: ${err}`);
    }
    // console.log('info ', info);
  });
}

function sendEmailOrderSentTo(recipientAddress, order) {
  const outputHtml = `
    <h1>Vaše objednávka byla odeslána</h1>
    <h2>Sourh</h2>
    <p>Jméno: ${order.name}</p>
    <p>Telefonní číslo:  ${order.phoneNumber}</p>
    <p>Způsob dopravy: ${
      order.orderMethod === 'DELIVERY' ? 'Rozvoz' : 'Osobní vyzvednutí'
    }</p>
    <p>Celková cena: ${order.totalPrice} ,- Kč</p>
    <h2>Objednané položky</h2>
    ${renderItems(order.items)}
  `;
  const message = {
    from: SENDER_ADDRESS,
    to: recipientAddress,
    subject: 'Objednávka byla odeslána',
    text: 'Vase objednvka byla odeslana blablabla',
    html: outputHtml,
  };
  sendEmail(message);
}

function sendEmailOrderConfirmedTo(recipientAddress, order) {
  const outputHtml = `
  <h1>Vaše objednávka s číslem ${order.orderNumber} byla potvrzena</h1>
  <h2>Sourh</h2>
  <p>Jméno: ${order.name}</p>
  <p>Telefonní číslo:  ${order.phoneNumber}</p>
  <p>Způsob dopravy: ${
    order.orderMethod === 'DELIVERY' ? 'Rozvoz' : 'Osobní vyzvednutí'
  }</p>
  <p>Číslo objednávky: ${order.orderNumber}</p>
  <p>Celková cena: ${order.totalPrice} ,- Kč</p>
  <h2>Objednané položky</h2>
  ${renderItems(order.items)}
`;
  const message = {
    from: SENDER_ADDRESS,
    to: recipientAddress,
    subject: 'Objednávka byla potvrzena',
    text: 'Vase objednvka byla potvrzena blablabla',
    html: outputHtml,
  };
  sendEmail(message);
}

function renderItems(items) {
  return items.map((item) => {
    return `<p> ${item.amount}x  ${item.name} ${item.price},- Kč</p>`;
  });
}

module.exports = {
  sendEmailOrderSentTo,
  sendEmailOrderConfirmedTo,
};
