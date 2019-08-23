const express = require('express');
const logger = require('./logger');
const bodyParser = express.json();
const bookmarks = require('./data');
const uuid = require('uuid/v4')

const bookmarkRouter = express.Router();

bookmarkRouter.route('/')
.get((req, res) => {
  logger.info('returning bookmarks')
  res.json(bookmarks);
})
.post(bodyParser, (req, res) => {
  const { title, url } = req.body

  if (!title || !url) {
    logger.error('url or title not provided')
    return res
      .status(400)
      .send('Must provide a title and url');
  }

  const newBook = {id: uuid(), title, url}
  bookmarks.push(newBook);
  logger.info('made new book')
  res 
    .status(201)
    .send(newBook.id)

})

bookmarkRouter.route('/:id')
.get((req, res) => {
  id = req.params.id;
  let item = bookmarks.find(book => book.id === id);
  if (item === undefined){
    logger.error('no book with that id')
    res
      .status(404)
      .send('No book with that ID');
  } else {
    logger.info('found book with that id')
    res.json(item);
  }
})
.delete((req, res) => {
  id = req.params.id;
  for (let i=0; i<bookmarks.length; i++) {
    if (bookmarks[i].id === id) {
      bookmarks.splice(i, 1)
      logger.info('deleted item with id '+id)
      return res
        .status(202)
        .send('successfully deleted')
    }
  }
  logger.error('no book with provided id')
  return res
    .status(400)
    .send('No book with that ID, cannnot delete it')
})

module.exports = bookmarkRouter;