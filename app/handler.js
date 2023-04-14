// menampung konfigurasi fungsi untuk menjalankan aplikasi yg akan diimport oleh routes.js
const bookshelf = require('./bookshelf');  // get book data array
const { nanoid } = require('nanoid');


const createBooksHandler = (request, h) => {
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

    const { id } = nanoid(16)

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

    bookshelf.push(newBook)

    const isSuccess = bookshelf.filter((book) => book.id === id).length > 0
    if (isSuccess) {
        const res = h.response({
            status: 'success',
            data: {
                bookId:id
            }
        })

        res.code(201)
        return res
    }

    const res = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan!'
    })
    res.code(500)
    return res
}

module.exports = { createBooksHandler }