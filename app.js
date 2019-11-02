const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');

// books - get all
bookRouter.route('/books')
  .get((request, response) => {
    let query = {};

    if (request.query.genre) {
      query = {
        genre: request.query.genre
      };
    }
    Book.find(query, (err, books) => {
      if (err) {
        return response.send(err);
      }

      return response.json(books);
    });
  });

// books - get by id
bookRouter.route('/books/:bookId')
  .get((request, response) => {
    const {
      bookId
    } = request.params;

    Book.findById(bookId, (err, book) => {
      if (err) {
        return response.send(err);
      }

      return response.json(book);
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
