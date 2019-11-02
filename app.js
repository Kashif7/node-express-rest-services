const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// books - get all
bookRouter.route('/books')
  .post((request, response) => {
    const book = new Book(request.body);

    console.log(book);
    return response.json(book);
  })
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