const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');

// setting up the books API
bookRouter.route('/books')
  .get((request, response) => {
    Book.find((err, books) => {
      if (err) {
        return response.send(err);
      }

      return response.json(books);
    });
  });

app.use('/api', bookRouter);


// handling the base URL get requests
app.get('/', (request, response) => {
  response.send('Welcome to my API');
});

app.listen(port, () => {
  console.log(`Running on ${port}`);
});