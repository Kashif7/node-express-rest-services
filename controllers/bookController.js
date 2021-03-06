function bookController(Book) {
  function getBooks(request, response) {
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

      const booksWithSelfLinks = books.map((book) => {
        const newBook = book.toJSON();
        newBook.links = {};
        newBook.links.self = `http://${request.headers.host}/api/books/${newBook._id}`;

        return newBook;
      });

      return response.json(booksWithSelfLinks);
    });
  }

  function getBook(request, response) {
    console.log(request);
    const newBook = request.book.toJSON();
    const genre = encodeURIComponent(newBook.genre);
    newBook.links = {};
    newBook.links.filterByGenre = `http://${request.headers.host}/api/books?genre=${genre}`;

    return response.json(newBook);
  }

  function addBook(request, response) {
    if (!request.body.title) {
      response.status(400);
      return response.send('Title is Required');
    }
    
    const book = new Book(request.body);

    if (!request.body.title) {
      return response.send('Title is required');
    }
    book.save();
    response.status(201);
    
    return response.json(book);
  }

  function replaceBook(request, response) {
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
  }

  function updateBook(request, response) {
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
  }

  function deleteBook(request, response) {
    const {
      book
    } = request;

    book.remove((error) => {
      if (error) return response.send(error);

      return response.sendStatus(204);
    });
  }

  return {
    getBooks,
    getBook,
    addBook,
    replaceBook,
    updateBook,
    deleteBook
  };
}

module.exports = bookController;
