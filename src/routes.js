const {addBook, getAllBooks, getDetailedBook,
  updateSpecifiedBook} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },

  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },

  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getDetailedBook,
  },

  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateSpecifiedBook,
  },
];

module.exports = {routes};
