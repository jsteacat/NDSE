const {Schema, model} = require('mongoose');

// поле id мангус добавит по умолчанию при создании новой модели
const BookSchema = new Schema({
  title: String,
  description: String,
  authors: String,
  favorite: String,
  fileCover: String,
  fileName: String
})

module.exports = model('Book', BookSchema);