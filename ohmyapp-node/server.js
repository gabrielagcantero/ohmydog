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
    let data = [d.mail, "111111", d.name, d.lastName, d.nac, false, d.tel];
    let sql = "INSERT INTO personas(mail, pass, firstName, lastName, nac, veter, tel) VALUES(?,?,?,?,?,?,?)";
    conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
 
app.listen(3000, () => {
  console.log("Server running successfully on 3000");
});