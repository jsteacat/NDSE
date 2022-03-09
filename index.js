const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const userApiRouter = require('./routes/api/user');
const bookApiRouter = require('./routes/api/book');
const indexRouter = require('./routes');
const bookRouter = require('./routes/book');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname + '/public'));

app.use('/', indexRouter);
app.use('/books', bookRouter);
app.use('/api/user', userApiRouter);
app.use('/api/books', bookApiRouter);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/`);
    });
  } catch (e) {
    console.log('DB connect error', e);
  }
}

start();