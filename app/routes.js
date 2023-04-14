// menampun fungsi dan method untuk melakukan request penggunaan API
const { createBooksHandler } = require('./handler')



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
    handler: createBooksHandler
}
]

module.exports = routes