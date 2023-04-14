// menampung konfigurasi fungsi untuk menjalankan aplikasi yg akan diimport oleh routes.js
const books = require('./bookshelf');  // get book data array
const { nanoid } = require('nanoid');

// handler for crearting books data
const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload

    // to check and prevent name is not empty string or null
    if (!name || name === ''|| name === null) {
        const res = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        })
        res.code(400)
        return res
    }

    // to check and prevent readpage > pageCount
    if (readPage > pageCount) {
        const res = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        res.code(400)
        return res
    }



    const id = nanoid(16)

    // mengetahui apakah buku telah selesai dibaca atau belum
    const isFinished = (readPage, pageCount) => {
        if (readPage === pageCount) {
            return true
        } 
        if (readPage < pageCount) {
            return false
        }
    }

    const finished = isFinished(readPage, pageCount)

    const insertedAt = new Date().toISOString()

    const updatedAt = insertedAt

    

    // format informasi buku baru yang telah dibuat
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    }   

    books.push(newBook)

    const isSuccess = books.filter((book) => book.id === id).length > 0
    if (isSuccess) {
        const res = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId:id
            }
        })

        res.code(201)
        return res
    }

    const res = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan'
    })
    res.code(404)
    return res
}

//handler for show or get all books data from books array, only show id, name and publisher
const getAllBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query

    if (name !== undefined) {
        const filterBooksByName = books
        .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
        .map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }));
        return {
        status: "success",
        data: {
            books: filterBooksByName,
        },
        };
    }



    if (name) {
        const lowName = name.toLowerCase()

        const response = h.response({
        status: 'success',
        data: {
        books: books
            .filter((n) => n.name === lowName)
            .map((books) => ({
                id: books.id,
                name: books.name,
                publisher: books.publisher
            }))
        }
    })
        response.code(200)
        return response
    }

    if (reading === '1') {
        const response = h.response({
        status: 'success',
        data: {
            books: books
            .filter((r) => r.reading === true)
            .map((books) => ({
                id: books.id,
                name: books.name,
                publisher: books.publisher
            }))
        }
        })
        response.code(200)
    return response
    }

    if (reading === '0') {
        const response = h.response({
        status: 'success',
        data: {
            books: books
            .filter((r) => r.reading === false)
            .map((books) => ({
                id: books.id,
                name: books.name,
                publisher: books.publisher
            }))
        }
        })
        response.code(200)
        return response
    }

    if (finished === '1') {
        const response = h.response({
        status: 'success',
        data: {
            books: books
            .filter((f) => f.finished === true)
            .map((books) => ({
                id: books.id,
                name: books.name,
                publisher: books.publisher
            }))
        }
    })
    response.code(200)
    return response
    }

    if (finished === '0') {
    const response = h.response({
        status: 'success',
        data: {
        books: books
            .filter((f) => f.finished === false)
            .map((books) => ({
                id: books.id,
                name: books.name,
                publisher: books.publisher
            }))
        }
    })
    response.code(200)
    return response
    }

    const response = h.response({
        status: 'success',
        data: {
        books: books.map((m) => ({
        id: m.id,
        name: m.name,
        publisher: m.publisher
        }))
        }
    })
    response.code(200)
    return response
}

const getByIdBooksHandler = (request, h) => {
    const { bookId } = request.params

    const book = books.filter((book) => book.id === bookId)[0]
    if (book !== undefined) {
        return {
        status: 'success',
        data: {
            book
        }
        }
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    })
    response.code(404)
    return response
}


const editBookByIdHandler = (request, h) => {
    const {id} = request.params
    const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;    
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
    if (!name || name === ''|| name === null) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);

        return response;
    }

    if (pageCount < readPage) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);

        return response;
    }

    const finished = (pageCount === readPage);

        books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        updatedAt,
        };

    const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    });
    response.code(200);

    return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);

    return response;
};

    // handler for DELETE book
    const deleteBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = books.findIndex((note) => note.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
    response.code(200);
    return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);

    return response;
};



module.exports = { addBookHandler, getAllBooksHandler, getByIdBooksHandler, editBookByIdHandler, deleteBookByIdHandler}