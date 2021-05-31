const createError = require('http-errors');
const express = require('express');
const app = express();
const PORT = 3000;

const path = require('path');
const morgan = require('morgan');

const formRouter = require('./routes/form');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));
app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: false }));

const messages = [
  {
    text: 'Hi there!',
    user: 'Yuki',
    timestamp: new Date(),
  },
  {
    text: 'Here we are.',
    user: 'Albert',
    timestamp: new Date(),
  },
];

app.get('/', (req, res) => {
  res.render('index', { messages });
});

//Form stuff
app.use('/new', formRouter);

//Intercept post requests
app.use((req, res, next) => {
  let { name, message } = req.body;

  let newMessage = { user: name, text: message, timestamp: new Date() };
  messages.push(newMessage);

  res.redirect('/');
});

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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
