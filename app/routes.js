// menampun fungsi dan method untuk melakukan request penggunaan API
const { addBookHandler, getAllBooksHandler, getByIdBooksHandler, editBookByIdHandler, deleteBookByIdHandler} = require('./handler')



const routes = [
{
    method: 'GET',
    path: '/',
    // handler: (request, h) => {
    handler: () => {

        return 'Ini adalah halaman home';
    }
},
{
    method: '*',
    path:'/',
    handler: () => {
        return 'Tidak dapat mengakses menggunakan metode ini'
    }
},
{
    method: 'POST',
    path:'/books',
    handler: addBookHandler
},
{
    method: 'GET',
    path:'/books',
    handler: getAllBooksHandler
},
{
    method: 'GET',
    path: '/books/{bookId}',
    handler: getByIdBooksHandler
},
{
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler,
},
{
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler
}
]

module.exports = routes