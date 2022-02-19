const path = require('path');
const router = require('express').Router();
const fetch = require('node-fetch');
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

router.get('/', (req, res) => {
  const { books } = store;
  res.render('book/index', {
    title: 'Library',
    books
  });
});

router.get('/create', (req, res) => {
  res.render('book/create', {
    title: 'Library | create',
    book: {},
  });
});

router.post('/create', fileMiddleware.fields([{ name: 'fileBook', maxCount: 1 }, { name: 'fileCover', maxCount: 1 }]), (req, res) => {
  const { books } = store;
  const { title, description, authors, favorite, fileName } = req.body;
  const fileBook = req.files ? req.files.fileBook?.path : '';
  const fileCover = req.files ? req.files.fileCover?.path : '';

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
  books.push(newBook);

  res.redirect('/books');
});

//детальная книги
router.get('/:id', async (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex(el => el.id === id);
  try {
    if (idx !== -1) {
      const count = await fetch(`/counter/:${id}`, {method: 'get'});
      await fetch(`/counter/:${id}/incr`, { method: 'post' });
      res.render('book/view', {
        title: 'Library | view',
        book: books[idx],
        count
      });
    } else {
      res.status(404).redirect('/404');
    }
  } catch {
    res.status(404).redirect('/404');
  }
});

router.get('/update/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render('book/update', {
            title: 'Library | edit',
            book: books[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/update/:id', fileMiddleware.fields([{ name: 'fileBook', maxCount: 1 }, { name: 'fileCover', maxCount: 1 }]), (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex(el => el.id === id);
  const { title, description, authors, favorite, fileName } = req.body;
  const fileBook = req.files ? req.files.fileBook?.path : '';
  const fileCover = req.files ? req.files.fileCover?.path : '';

  if (idx !== -1) {
    books[idx] = { ...books[idx], title, description, authors, favorite, fileCover, fileName, fileBook };
    res.redirect(`/books/${id}`);
  } else {
    res.status(404).redirect('/404');
  }
});

router.post('/delete/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
      books.splice(idx, 1);
      res.redirect('/books');
  } else {
      res.status(404).redirect('/404');
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
            res.status(404).redirect('/404');
        }
    });

    if (file !== undefined) {
      return file;
    } else {
      res.status(404).redirect('/404');
    }
  } else {
    res.status(404).redirect('/404');
  }
});

module.exports = router;