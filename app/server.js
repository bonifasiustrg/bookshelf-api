// menampung fungsi untuk server dan segala konfigurasi server dijalankan disini

const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {

    const server = Hapi.server({
        port: 9000, // KRITERIA 1 PROJECT
        host: 'localhost'
    });

    server.route(routes)   // get from routes.js
    await server.start();
    console.log('Server sedang berjalan pada port -> %s', server.info.uri);
};
/* 
process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});
 */


// init();
module.exports = init