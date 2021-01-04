const express = require('express');
const app = express();

app.get('/', async (request, response) => {
  response.send();
});

app.listen(process.env.PORT || 3000, () =>
  console.log('app is available on localhost 3000')
);
