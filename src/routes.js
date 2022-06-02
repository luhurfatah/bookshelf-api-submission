const {addBook, getAllBooks, getDetailedBook,
  updateSpecifiedBook,
  deleteSepecifiedBook} = require('./handler');

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

  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteSepecifiedBook,
  },
];

module.exports = {routes};
