const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// handling the base URL get requests
app.get('/', (request, response) => {
  response.send('Welcome to my API');
});

app.listen(port, () => {
  console.log(`Running on ${port}`);
});