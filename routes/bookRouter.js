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

      return response.sendStatus(404);
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

      book.save((error) => {
        if (error) return response.send(error);

        return response.json(book);
      });
    }).patch((request, response) => {
      const {
        book,
        body
      } = request;

      //  eslint-disable-next-line no-underscore-dangle
      if (body._id) {
        //  eslint-disable-next-line no-underscore-dangle
        delete body._id;
      }

      Object.entries(body).forEach((entry) => {
        const [
          key,
          value
        ] = entry;

        book[key] = value;
      });

      book.save((error) => {
        if (error) return response.send(error);

        return response.json(book);
      });
    });

  return bookRouter;
}

module.exports = routes;
