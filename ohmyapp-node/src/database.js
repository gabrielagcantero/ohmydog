const mysql = require('mysql');
const {promisify} = require('util');
const {database} = require('../keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) =>{
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('La base de datos fue cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('la base de datos tiene muchas conexiones');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('conexion de la base de datos rechazada');
        }
    }
    if (connection) connection.release();
        console.log('BD conectada');
    return ;

})

//convierto a promesas los callbacks
pool.query = promisify(pool.query);

module.exports = pool;