require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../app');
const agent = request.agent(app);

const Book = require('../models/bookModel');

describe('Book crud Test', () => {
  it('should allow a book to be posted and return read and _id', (done) => {
    const newBook = {
      title: 'Test Book',
      author: 'Test Author',
      genre: 'Fiction'
    };

    agent.post('/api/books')
      .send(newBook)
      .end((err, results) => {
        console.log(results);

        results.body.read.should.not.equal(true);
        results.body.should.have.property('_id');

        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();

    done();
  });

  after((done) => {
    mongoose.connection.close();

    app.server.close(done());
  });
});