const path = require('path');
const router = require('express').Router();
const { Book } = require('../../models');
const fileMiddleware = require('../../middlewares/file');

//получить все книги
router.get('/', async (req, res) => {
  //получаем массив всех книг
  const books = await Book.find();
  res.json(books);
});

//получить книгу по id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).select('-__v');
    if (book) {
      res.json(book);
    } else {
      res
      .status(404)
      .json('book | not found');
    }
  } catch {
     res
      .status(404)
      .json('book | not found');
  }
});

//создать книгу
router.post('/', fileMiddleware.fields([{ name: 'fileBook', maxCount: 1 }, { name: 'fileCover', maxCount: 1 }]), (req, res) => {
  // const fileBook = req.files ? req.files.fileBook?.path : '';
  // const fileCover = req.files ? req.files.fileCover?.path : '';
  const newBook = new Book(req.body);
  try {
    await newBook.save();
    res
    .status(201)
    .json(newBook);
  } catch (e) {
    console.error(e);
  }
});

//редактировать книгу по id
router.put('/:id', fileMiddleware.fields([{ name: 'fileBook', maxCount: 1 }, { name: 'fileCover', maxCount: 1 }]), (req, res) => {
  // const fileBook = req.files ? req.files.fileBook?.path : '';
  // const fileCover = req.files ? req.files.fileCover?.path : '';

   const { id } = req.params;
  try {
    const book = await Book.findByIdAndUpdate(id, req.body);
    if (book) {
      res.json(book);
    } else {
      res
      .status(404)
      .json('book | not found');
    }
  } catch (e) {
    res
      .status(404)
      .json('book | not found');
  }
});

//удалить книгу по id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  try {
    await Book.deleteOne({ _id: id });
    res.json('OK');
  }
  catch (e) {
    res
      .status(404)
      .json('book | not found');
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
//             res.status(404).json();
//         }
//     });

//     if (file !== undefined) {
//       return file;
//     } else {
//       res
//       .status(404)
//       .json('file | missing');
//     }
//   } else {
//     res
//       .status(404)
//       .json('book | not found');
//   }
// });

module.exports = router;