const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/api/sendEmailOrderReceived', (req, res) => {});

app.post('/api/sendEmailConfirmed', (request, response) => {
  console.log(request.body);

  response.send('done');
});

app.listen(process.env.PORT || 3000, () =>
  console.log('app is available on localhost 3000')
);
