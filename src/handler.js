const {nanoid} = require('nanoid');
const {books} = require('./books');

const addBook = (request, h) => {
  const {name, year, author, summary,
    publisher, pageCount, readPage,
    reading} = request.payload;
  const id = nanoid(16);
  const finished = pageCount == readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const noName = !name;
  const readPageError = readPage > pageCount;


  if (noName) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    res.code(400);
    return res;
  }

  if (readPageError) {
    const res = h.response({
      status: 'fail',
      // eslint-disable-next-line max-len
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    res.code(400);
    return res;
  }

  if (!noName && !readPageError) {
    const book = {
      id, name, year, author, summary, publisher,
      pageCount, readPage, finished, reading, insertedAt, updatedAt,
    };

    books.push(book);

    const isSuccess = books.filter((n) => n.id == id);

    if (isSuccess) {
      const res = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });

      res.code(201);
      return res;
    }
  }

  const res = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });

  res.code(500);
  return res;
};

const getAllBooks = (request, h) => {
  const res = h.response({
    status: 'success',
    data: {
      books: books.map((n) => ({
        id: n.id,
        name: n.name,
        publisher: n.publisher})),
    },
  });
  res.code(200);
  return res;
};

const getDetailedBook = (request, h) => {
  const {bookId} = request.params;
  const theBook = books.filter((n) => n.id = bookId)[0];

  if (theBook) {
    const res = h.response({
      status: 'success',
      data: {
        book: theBook,
      },
    });
    res.code(200);
    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  res.code(404);
  return res;
};

const updateSpecifiedBook = (request, h) => {
  const {bookId} = request.params;
  const {name, year, author, summary, publisher,
    pageCount, readPage, reading} = request.payload;
  const updatedAt = new Date().toISOString();
  const isNoName = !name;
  const isreadPageError = readPage > pageCount;
  const bookIndex = books.findIndex((n) => n.id == bookId);

  if (isNoName) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    res.code(400);
    return res;
  }

  if (isreadPageError) {
    const res = h.response({
      status: 'fail',
      // eslint-disable-next-line max-len
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    res.code(400);
    return res;
  }

  if (bookIndex < 0) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'});
    res.code(404);
    return res;
  }

  books[bookIndex] = {...books[bookIndex], name,
    year, author, summary, publisher,
    pageCount, readPage, reading, updatedAt,
  };

  const res = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  res.code(200);
  return res;
};


module.exports = {addBook, getAllBooks, getDetailedBook, updateSpecifiedBook};
