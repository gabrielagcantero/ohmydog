var mysql = require('mysql');
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
 
const app = express();
 
app.use(cors());
// parse application/json
app.use(bodyParser.json());
  
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'ohmybase',
  port: 3306
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//add new client
app.post('/store-clientdata',(req, res) => {
    let d = req.body;
    let data = [d.mail, d.pass, d.name, d.lastName, d.nac, false, d.tel];
    let sql = "INSERT INTO personas(mail, pass, firstName, lastName, nac, veter, tel) VALUES(?,?,?,?,?,?,?)";
    conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

//add new dog
app.post('/store-dogdata',(req, res) => {
  let d = req.body;
  let data = [d.owner, d.name, d.breed, d.sex, d.nac, d.obs, true, d.image];
  let sql = "INSERT INTO dogs(owner, name, breed, sex, nac, obs, cruza, image) VALUES(?,?,?,?,?,?,?,?)";
  conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//add new turn
app.post('/store-turndata',(req, res) => {
  let d = req.body;
  let data = [d.client, d.dog, d.day, d.time, d.motive];
  let sql = "INSERT INTO turnos(client, dog, day, hour, motive) VALUES(?,?,?,?,?)";
  conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//delete turn
app.post('/delete-turndata',(req, res) => {
  let id = req.body.value;
  let sql = 'DELETE FROM turnos where id="' + id + '"';
  conn.query(sql, [0], (err, results) => {
    if(err) throw err;
    res.json(results);
  })
});

//get clients
app.get('/get-clientdata',(req, res) => {
    let sql = 'SELECT * FROM personas';
    conn.query(sql, [0], (err, results) => {
      if(err) throw err;
      res.json(results);
    })});

//get dogs
app.get('/get-ownerdata',(req, res) => {
  let sql = 'SELECT * FROM dogs';
  conn.query(sql, [0], (err, results) => {
    if(err) throw err;
    res.json(results);
  })});

//get turns
app.get('/get-turndata',(req, res) => {
  let sql = 'SELECT * FROM turnos';
  conn.query(sql, [0], (err, results) => {
    if(err) throw err;
    res.json(results);
  })});



 
app.listen(3000, () => {
  console.log("Server running successfully on 3000");
});