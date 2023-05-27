const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

app.use(cors());
// parse application/json
app.use(bodyParser.json());

//conexion a la BD
const mysql = require('mysql');
const {database} = require('./keys');

const conn = mysql.createConnection(database);

conn.connect((err) =>{
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
  console.log('BD conectada');
  
});




//add new client
app.post('/store-clientdata',(req, res) => {
  let d = req.body;
  let data = [d.mail, d.pass, d.name, d.lastName, d.nac, false, d.tel];
  let sql = "INSERT INTO persona(mail, pass, firstName, lastName, nac, veter, tel) VALUES(?,?,?,?,?,?,?)";
  conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//add new dog
app.post('/store-dogdata',(req, res) => {
let d = req.body;
let data = [d.owner, d.name, d.breed, d.sex, d.nac, d.obs, true, d.image];
let sql = "INSERT INTO perro(owner, name, breed, sex, nac, obs, cruza, image) VALUES(?,?,?,?,?,?,?,?)";
conn.query(sql, data,(err, results) => {
  if(err) throw err;
  res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
});
});

//add new turn
app.post('/store-turndata',(req, res) => {
let d = req.body;
let data = [d.client, d.dog, d.day, d.time, d.motive];
let sql = "INSERT INTO turno(client, dog, day, hour, motive) VALUES(?,?,?,?,?)";
conn.query(sql, data,(err, results) => {
  if(err) throw err;
  res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
});
});

//delete turn
app.post('/delete-turndata',(req, res) => {
let id = req.body.value;
let sql = 'DELETE FROM turno where id="' + id + '"';
conn.query(sql, [0], (err, results) => {
  if(err) throw err;
  res.json(results);
})
});



//get clients
app.get('/get-clientdata',(req, res) => {
  let sql = 'SELECT * FROM persona';
  conn.query(sql, [0], (err, results) => {
    if(err) throw err;
    res.json(results);
  })}
);


//get dogs
app.get('/get-ownerdata',(req, res) => {
let sql = 'SELECT * FROM perro';
conn.query(sql, [0], (err, results) => {
  if(err) throw err;
  res.json(results);
})});

//get turns
app.get('/get-turndata',(req, res) => {
let sql = 'SELECT * FROM turno';
conn.query(sql, [0], (err, results) => {
  if(err) throw err;
  res.json(results);
})});


//settings
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () =>{
  console.log('server en puerto', app.get('port'));

})