require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
  // const minutes = 5;
  // const delay = 60 * 1000 * minutes;

  // db.collection('pendingEmails')
  //   .get()
  //   .then(function (querySnapshot) {
  //     querySnapshot.forEach(function (doc) {
  //       console.log(doc.id);
  //       const secondsSinceEpoch = Math.round(Date.now() / 1000);
  //       const timeDiff = secondsSinceEpoch - doc.data().created.seconds;
  //       console.log(timeDiff);
  //       if (timeDiff > 3600) {
  //         // 3600 = 1hr in seconds
  //         console.log('send!');
  //         sendOrderFinishedEmailTo(doc.data().email, doc.data().order);
  //       } else {
  //         console.log('Dont send!');
  //       }
  //     });
  //   });

  res.send(req.body.order);
});

const PORT = 3000;
app.listen(process.env.PORT || PORT, () =>
  console.log(`server is running at port ${PORT}`)
);
