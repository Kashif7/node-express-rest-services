const should = require('should'); 
const sinon = require('sinon');
const booksController = require('../controllers/bookController');

describe('Book Controller Tests', () => {
    describe('Add Book', () => {
         it('should not allow an empty title on add', () => {
            const Book = function(book) {
                this.save = () => {};
            }

            const request = {
                body: {
                    author: 'Kashif'
                }
            };

            const response = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            };

            const controller = booksController(Book);
            controller.addBook(request, response);

            response.status.calledWith(400).should.equal(true, `Bad Status ${response.status.args[0][0]}`);
            response.send.calledWith('Title is Required').should.equal(true);
         });
    });
    
});