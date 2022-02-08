const express = require('express');

const userRouter = require('./routes/user');
const bookRouter = require('./routes/book');

const app = express();

app.use('/public', express.static(__dirname + '/public'));

app.use('/api/user', userRouter);
app.use('/api/books', bookRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});