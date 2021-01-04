const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const {
  sendEmailOrderReceivedTo,
  sendEmailOrderConfirmedTo,
} = require('./models/emailSender');
const app = express();

app.use(bodyParser.json());

app.post('/api/sendEmailOrderReceived', (req, res) => {
  sendEmailOrderReceivedTo(req.body.email);
  res.send('');
});

app.post('/api/sendEmailOrderConfirmed', (req, res) => {
  sendEmailOrderConfirmedTo(req.body.email);
  res.send('');
});

app.listen(process.env.PORT || 3000, () =>
  console.log('app is available on localhost 3000')
);
