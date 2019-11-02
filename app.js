const express = require('express');

const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3000;

// setting up the books API
bookRouter.route('/books')
  .get((request, response) => {
    const responseJSON = {
      hello: 'This is my API',
    };

    response.json(responseJSON);
  });

app.use('/api', bookRouter);


// handling the base URL get requests
app.get('/', (request, response) => {
  response.send('Welcome to my API');
});

app.listen(port, () => {
  console.log(`Running on ${port}`);
});
