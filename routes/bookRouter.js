/* eslint-disable no-param-reassign */

const express = require('express');

function routes(Book) {
  const bookRouter = express.Router();

  // books - add and get all
  bookRouter.route('/books')
    .post((request, response) => {
      const book = new Book(request.body);
      book.save();

      return response.status(201).json(book);
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

  bookRouter.use('/books/:bookId', (request, response, next) => {
    const {
      bookId
    } = request.params;

    Book.findById(bookId, (err, book) => {
      if (err) {
        return response.send(err);
      }

      if (book) {
        request.book = book;
        return next();
      }

      return response.statusCode(404);
    });
  });

  // books - get by id
  bookRouter.route('/books/:bookId')
    .get((request, response) => response.json(request.book))
    .put((request, response) => {
      const {
        book,
        body: {
          title,
          author,
          genre,
          read
        }
      } = request;

      book.title = title;
      book.author = author;
      book.genre = genre;
      book.read = read;

      book.save();
      return response.json(book);
    });

  return bookRouter;
}

module.exports = routes;
