const express = require('express');
const router = express.Router();

const messages = require('../models/board');

router.get('/', (req, res) => {
  res.render('form');
});

router.post('/', (req, res) => {
  let { name, message } = req.body;

  let newMessage = { user: name, text: message, timestamp: new Date() };
  messages.push(newMessage);

  res.redirect('/');
});

module.exports = router;
