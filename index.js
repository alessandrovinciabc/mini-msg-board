const createError = require('http-errors');
const express = require('express');
const app = express();
const PORT = 3000;

const path = require('path');
const morgan = require('morgan');

const formRouter = require('./routes/form');

const messages = require('./models/board');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));
app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: false }));

//               Route Handling

app.get('/', (req, res) => {
  res.render('index', { messages });
});

app.use('/new', formRouter);

//               Error Handling

app.use((req, res, next) => {
  next(createError(404, 'Resource not found.'));
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    return res.status(404).send(err.message);
  }

  console.log(err);
  res.status(500).send('Something went wrong.');
});

/**********************************************/

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
