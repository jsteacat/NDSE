const path = require('path');
const router = require('express').Router();
const { Book } = require('../models');
const fileMiddleware = require('../middlewares/file');

// получить все книги
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.render('book/index', {
    title: 'Library',
    books
  });
});

// форма создания книги
router.get('/create', (req, res) => {
  res.render('book/create', {
    title: 'Library | create',
    book: {},
  });
});

// создание книги
router.post('/create', fileMiddleware.fields([{ name: 'fileBook', maxCount: 1 }, { name: 'fileCover', maxCount: 1 }]), async (req, res) => {
  // const fileBook = req.files ? req.files.fileBook?.path : '';
  // const fileCover = req.files ? req.files.fileCover?.path : '';

  const newBook = new Book(req.body);
  try {
    await newBook.save();
  } catch (e) {
    console.error(e);
  }

  res.redirect('/books');
});

//детальная книги
router.get('/:id', async(req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).select('-__v');
    res.render('book/view', {
      title: 'Library | view',
      book,
    });
  } catch {
    res.status(404).redirect('/404');
  }
});

// форма для редактирования, предзаполненная данными о книге
router.get('/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).select('-__v');
    res.render('book/update', {
      title: 'Library | edit',
      book,
    });
  } catch {
    res.status(404).redirect('/404');
  }
});

// редактирование данных о книге
router.post('/update/:id', fileMiddleware.fields([{ name: 'fileBook', maxCount: 1 }, { name: 'fileCover', maxCount: 1 }]), async (req, res) => {
  // const fileBook = req.files ? req.files.fileBook?.path : '';
  // const fileCover = req.files ? req.files.fileCover?.path : '';
  const { id } = req.params;
  try {
    await Book.findByIdAndUpdate(id, req.body);
    res.redirect(`/books/${id}`);
  } catch (e) {
    res.status(404).redirect('/404');
  }
});

// удаление книги
router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Book.deleteOne({ _id: id });
    res.redirect('/books');
  }
  catch (e) {
    res.status(404).redirect('/404');
  }
});

//скачать книгу по id
// router.get('/:id/download', (req, res) => {
//   const { books } = store;
//   const { id } = req.params;
//   const idx = books.findIndex(el => el.id === id);

//   if (idx !== -1) {
//     const file = res.download(path.join(__dirname, '../', books[idx].fileBook), 'book.pdf', err => {
//         if (err) {
//             res.status(404).redirect('/404');
//         }
//     });

//     if (file !== undefined) {
//       return file;
//     } else {
//       res.status(404).redirect('/404');
//     }
//   } else {
//     res.status(404).redirect('/404');
//   }
// });

module.exports = router;