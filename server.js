require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { sendPendingEmails } = require('./api/sendPendingEmails');

const {
  sendEmailOrderSentTo,
  sendEmailOrderConfirmedTo,
} = require('./utils/emailSender');

const app = express();

app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
  res.send('test2');
});

app.post('/api/sendEmailOrderSent', (req, res) => {
  sendEmailOrderSentTo(req.body.email, JSON.parse(req.body.order));
  res.send(req.body.order);
});

app.post('/api/sendEmailOrderConfirmed', (req, res) => {
  sendEmailOrderConfirmedTo(req.body.email, JSON.parse(req.body.order));
  res.send(req.body.order);
});

app.post('/api/sendOrderFinishedEmail', (req, res) => {
  sendPendingEmails();
  res.send(req.body.order);
});

const PORT = 3000;
app.listen(process.env.PORT || PORT, () =>
  console.log(`server is running at port ${PORT}`)
);
