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
    })
    .put((request, response) => {
      const {
        params: {
          bookId
        },
        body: {
          title,
          author,
          genre,
          read
        }
      } = request;

      Book.findById(bookId, (err, book) => {
        if (err) {
          return response.send(err);
        }

        book.title = title;
        book.author = author;
        book.genre = genre;
        book.read = read;

        book.save();

        return response.json(book);
      });
    });

  return bookRouter;
}

module.exports = routes;