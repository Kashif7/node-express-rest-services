/* eslint-disable no-param-reassign */

const express = require('express');
const bookController = require('../controllers/bookController');

function routes(Book) {
  const bookRouter = express.Router();
  const {
    getBooks,
    getBook,
    addBook,
    replaceBook,
    updateBook,
    deleteBook
  } = bookController(Book);

  // books - add and get all
  bookRouter.route('/books')
    .post(addBook)
    .get(getBooks);

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
    .get(getBook)
    .put(replaceBook)
    .patch(updateBook)
    .delete(deleteBook);

  return bookRouter;
}

module.exports = routes;
