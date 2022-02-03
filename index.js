const express = require('express');

const app = express();
const userUrl = '/api/user/';
const baseUrl = '/api/books/';

const { Book } = require('./models');
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
    fileName = `fileName${el}`
  );
    store.books.push(newBook);
});

//получить все книги
app.get(baseUrl, (req, res) => {
  //получаем массив всех книг
  const { books } = store;
  res.json(books);
});

//получить книгу по id
app.get(`${baseUrl}:id`, (req, res) => {
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
app.post(baseUrl, (req, res) => {
  //создаем книгу и возвращаем ее объект вместе с присвоенным id
  const { books } = store;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
  books.push(newBook);

  res
    .status(201)
    .json(newBook);
});

//редактировать книгу по id
app.put(`${baseUrl}:id`, (req, res) => {
  //редактируем объект книги, если запись не найдена вернем Code: 404
  const { books } = store;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  const { id } = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    books[idx] = { ...books[idx], title, description, authors, favorite, fileCover, fileName };
    res.json(books[idx]);
  } else {
    res
      .status(404)
      .json('book | not found');
  }
});

//удалить книгу по id
app.delete(`${baseUrl}:id`, (req, res) => {
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

//авторизация пользователя
app.post(`${userUrl}login`, (req, res) => {
  //метод всегда возвращает Code: 201 и статичный объект: { id: 1, mail: "test@mail.ru" }
  return res
    .status(201)
    .json({ id: 1, mail: 'test@mail.ru' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});