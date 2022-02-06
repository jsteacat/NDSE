const path = require('path');
const router = require('express').Router();
const { Book } = require('../models');
const fileMiddleware = require('../middlewares/file');

const store = {
  books: []
};

[1, 2, 3].map(el => {
  const newBook = new Book(
    title = `title${el}`,
    description = `description${el}`,
    authors = `authors${el}`,
    favorite = `favorite${el}`,
    fileCover = `fileCover${el}`,
    fileName = `fileName${el}`,
    fileBook = `fileBook${el}`
  );
    store.books.push(newBook);
});

//получить все книги
router.get('/', (req, res) => {
  //получаем массив всех книг
  const { books } = store;
  res.json(books);
});

//получить книгу по id
router.get('/:id', (req, res) => {
  //получаем объект книги, если запись не найдена вернем Code: 404
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res
      .status(404)
      .json('book | not found');
  }
});

//создать книгу
router.post('/', fileMiddleware.single('fileBook'), (req, res) => {
  //создаем книгу и возвращаем ее объект вместе с присвоенным id
  const { books } = store;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  const fileBook = req.file ? req.file.path : '';

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
  books.push(newBook);

  res
    .status(201)
    .json(newBook);
});

//редактировать книгу по id
router.put('/:id', fileMiddleware.single('fileBook'), (req, res) => {
  //редактируем объект книги, если запись не найдена вернем Code: 404
  const { books } = store;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  const { id } = req.params;
  const idx = books.findIndex(el => el.id === id);
  const fileBook = req.file ? req.file.path : books[idx].fileBook;

  if (idx !== -1) {
    books[idx] = { ...books[idx], title, description, authors, favorite, fileCover, fileName, fileBook };
    res.json(books[idx]);
  } else {
    res
      .status(404)
      .json('book | not found');
  }
});

//удалить книгу по id
router.delete('/:id', (req, res) => {
  //удаляем книгу и возвращаем ответ: 'ok'
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
      books.splice(idx, 1);
      res.json('OK');
  } else {
    res
      .status(404)
      .json('book | not found');
  }
});

//скачать книгу по id
router.get('/:id/download', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    const file = res.download(path.join(__dirname, '../', books[idx].fileBook), 'book.pdf', err => {
        if (err) {
            res.status(404).json();
        }
    });

    if (file !== undefined) {
      return file;
    } else {
      res
      .status(404)
      .json('file | missing');
    }
  } else {
    res
      .status(404)
      .json('book | not found');
  }
});

module.exports = router;