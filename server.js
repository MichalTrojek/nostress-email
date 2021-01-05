require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
  sendEmailOrderSentTo,
  sendEmailOrderConfirmedTo,
} = require('./models/emailSender');

const app = express();

app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
  res.send('test');
});

app.post('/api/sendEmailOrderSent', (req, res) => {
  sendEmailOrderSentTo(req.body.email, JSON.parse(req.body.order));
  res.send(req.body.order);
});

app.post('/api/sendEmailOrderConfirmed', (req, res) => {
  sendEmailOrderConfirmedTo(req.body.email, JSON.parse(req.body.order));
  res.send(req.body.order);
});

app.listen(process.env.PORT || 3000, () =>
  console.log('app is available on localhost 3000')
);
