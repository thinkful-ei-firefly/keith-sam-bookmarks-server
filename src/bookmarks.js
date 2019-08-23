const express = require('express');
const logger = require('./logger');
const bodyParser = express.json();
const bookmarks = require('./data');

const bookmarkRouter = express.Router();

bookmarkRouter.route('/')
.get((req, res) => {
  res.json(bookmarks);
})
.post(bodyParser, (req, res) => {
  console.log('bookmarks post' + bodyParser)
})
.delete((req, res) => {
  console.log('bookmarks delete')
})

module.exports = bookmarkRouter;