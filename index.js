const express = require('express');
const bodyParser = require('body-parser');

const userApiRouter = require('./routes/api/user');
const bookApiRouter = require('./routes/api/book');
const bookRouter = require('./routes/book');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname + '/public'));

app.use('/api/user', userApiRouter);
app.use('/api/books', bookApiRouter);
app.use('/books', bookRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});