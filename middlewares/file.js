const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // делаем везде else if на случай большего количества загружаемых файлов
    if (file.fieldname === 'fileBook') {
      cb(null, 'public/files');
    } else if (file.fieldname === 'fileCover') {
      cb(null, 'public/covers');
    }
  },
  filename(req, file, cb) {
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`);
  }
});

const allowedFileTypes = ['application/pdf', 'application/epub+zip', 'text/plain'];
const allowedCoverTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
  const allowedTypes = file.fieldname === 'fileBook'
    ? allowedFileTypes
    : (file.fieldname === 'fileCover' ? allowedCoverTypes : null);

  if (!allowedTypes || allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//TODO: сделать обработку ошибок

module.exports = multer({
  storage, fileFilter
});