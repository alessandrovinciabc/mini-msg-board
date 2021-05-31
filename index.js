const createError = require('http-errors');
const express = require('express');
const app = express();
const PORT = 3000;

const path = require('path');
const morgan = require('morgan');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.render('test');
});

app.use((req, res, next) => {
  next(createError(404, 'Resource not found.'));
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    return res.status(404).send(err.message);
  }

  res.status(500).send('Something went wrong.');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
