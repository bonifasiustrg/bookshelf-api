// menampung konfigurasi fungsi untuk menjalankan aplikasi yg akan diimport oleh routes.js
const bookshelf = require('./bookshelf');  // get book data array
const { nanoid } = require('nanoid');

// handler for crearting books data
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

    // to check and prevent name is not empty string or null
    if (!name || name === '') {
        const res = h.response({
            status: 'fail',
            message: 'Gagal menambah buku. Nama tidak boleh kosong'
        })
        res.code(400)
        return res
    }

    // to check and prevent readpage > pageCount
    if (readPage > pageCount) {
        const res = h.response({
            status: 'fail',
            message: 'Gagal menambah buku. nilai readPage tidak boleh lebih besar dari pageCount'
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

//handler for show or get all books data from bookshelf array, only show id, name and publisher
const getAllBooksHandler = (response, h) => ({
    status: 'success',
    data: {
        books: bookshelf.map( (book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher
        }))
    }
})

module.exports = { createBooksHandler, getAllBooksHandler }