const { v4: uuidv4 } = require('uuid');

class Book {
  constructor(title = '', description = '', authors = '', favorite = '', fileCover = '', fileName = '', id = uuidv4()) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }
}

module.exports = Book;