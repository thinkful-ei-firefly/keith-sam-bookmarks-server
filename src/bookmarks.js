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

bookmarkRouter.route('/:id')
.get((req, res) => {
  id = req.params.id;
  let item = bookmarks.find(book => book.id === Number(id));
  if (item === undefined){
    res
      .status(404)
      .send('No book with that ID');
  } else {
    res.json(item);
  }
})

module.exports = bookmarkRouter;