const mongoose = require('mongoose');

const {
  Schema
} = mongoose;

const bookModel = new Schema({
  title: {
    type: 'string'
  },
  author: {
    type: 'string'
  },
  genre: {
    type: 'string'
  },
  read: {
    type: 'boolean',
    default: false
  }
});

module.exports = mongoose.model('Book', bookModel);
