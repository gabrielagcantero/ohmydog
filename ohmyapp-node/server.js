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
        console.error('levanta la base jajaj');
    }
  }
  console.log('BD conectada');
  
});




//add new client
app.post('/store-clientdata',(req, res) => {
  let d = req.body;
  let data = [d.mail, d.pass, d.name, d.lastName, d.nac, false, d.tel];
  let sql = "INSERT INTO persona(mail, pass, frist_name, last_name, nac, veter, tel) VALUES(?,?,?,?,?,?,?)";
  conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

/*add new dog, creo una nueva libreta sanitaria y le asocio el id del perro
  PERRO -> sql1 = INSERT INTO perro(owner, name, breed, sex, nac, obs, cruza, image) VALUES(d.owner, d.name, d.breed, d.sex, d.nac, d.obs, true, d.image)
  LIBRETA -> sql3 = INSERT INTO libreta_sanitaria(id_perro) VALUES (dog.id)
*/
app.post('/store-dogdata',(req, res) => {

  /*
    CONSULTA 1: guardo en la tabla perro un nuevo perro
  */
  let d = req.body;
  let data = [d.owner, d.name, d.breed, d.sex, d.nac, d.obs, true, d.image];
  let sql = "INSERT INTO perro(owner, name, breed, sex, nac, obs, cruza, image) VALUES(?,?,?,?,?,?,?,?)";
  console.log("hola")
  conn.query(sql, data,(err, results) => {
      if(err) throw err;

      /*
        CONSULTA 2: busco en la tabla perro el perro recien ingresado(busco su id), 
        uso los daots de la carga xq no tengo el id 
      */
      let sql2 = 'SELECT * FROM perro WHERE (owner = "'+ d.owner +'" AND name = "'+d.name+'" AND breed = "'+d.breed+'" AND sex = "'+d.sex+'" AND nac = "'+d.nac+'" AND obs = "'+d.obs+'" AND image = "'+d.image+'")';
      conn.query(sql2, [0], (err, results2) => {
          if(err) throw err;
          
          /*
            CONSULTA 3: guardo Libreta NUEVA del perro recien ingresado
          */
          let sql3 = 'INSERT INTO libreta_sanitaria(id_perro) VALUES ("'+ results2[0].id+'")';
          conn.query(sql3, (err, results3) => {
              if(err) throw err;
              res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            });


      });
    });
  });

//add new dog en adopcion
app.post('/store-dogAdop',(req, res) => {
  let d = req.body;
  //verifico si el campo d.name esta vacio 
  //-> no puede hacerlo directo en la BD xq no tendria que estar ese campo en la consulta y no entendi como se haria de esa forma
  if(Object.entries(d.name).length === 0){
    d.name = "sin nombre";
  }
  let data = [d.name, d.age, d.breed, d.color, d.sex, d.obs, d.origin, d.owner];
  let sql = "INSERT INTO perro_adopcion(name, age, breed, color, sex, obs, origin, owner) VALUES(?,?,?,?,?,?,?,?)";
  conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
  });

//add new turn
app.post('/store-turndata',(req, res) => {
let d = req.body;
let data = [d.client, d.dog, d.day, d.hour, d.motive, d.why];
let sql = "INSERT INTO turno(client, dog, day, hour, motive, modificacion) VALUES(?,?,?,?,?,?)";
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

//delete dog en adopcion
app.post('/delete-dogAdop',(req, res) => {
let id = req.body.value;
let sql = 'DELETE FROM perro_adopcion where id_perroadop ="' + id + '"';
conn.query(sql, [0], (err, results) => {
  if(err) throw err;
  res.json(results);
})
});

/* comento porque no se usa por ahora
//Modificar turno
//campos: hora del turno y fecha del mismo
//consulta: UPDATE turno set day = "fecha" , hour = "horario"  WHERE id = "id_turn"
app.post('/update-turndata', (req, res) =>{
  let id_turn = req.body.id;
  let horario = req.body.hour;
  let fecha = req.body.day;
  let sql = 'UPDATE turno set day = "'+fecha+'" , hour = "'+horario+'"  WHERE id = "'+id_turn+'"';
  conn.query(sql, (err, results) => {
    if(err) throw err;  
    res.json(results);

  })
})*/

/*
  Modificar turno a aceptado
  campos: aceptar
  consulta: UPDATE turno set aceptar = "1"  WHERE id = "id_turn"
*/
app.post('/accept-turn', (req, res) => {
  let id_turn = req.body.id;
  let sql = 'UPDATE turno set aceptar = "1"  WHERE id = "'+id_turn+'"';
  conn.query(sql, (err, result) => {
    if(err) throw err;
    res.json(result);
  });
});


//get clients
app.get('/get-clientdata',(req, res) => {
  let sql = 'SELECT * FROM persona';
  conn.query(sql, [0], (err, results) => {
    if(err) throw err;
    res.json(results);
  })}
);

/*
  Obetener datos del cliente
  requiere el ID del cliente
  consulta: SELECT * FROM persona WHERE id_persona = "id_cli"
*/
app.post('/get-clientdataID', (req,res) => {
  let id_cli = req.body.id;
  let sql = 'SELECT * FROM persona WHERE id_persona = "'+id_cli+'"';
  conn.query(sql, (err, result) => {
    if(err) throw err;
    res.json(result);
  });
});



//get dogs
app.get('/get-ownerdata',(req, res) => {
  let sql = 'SELECT * FROM perro';
  conn.query(sql, [0], (err, results) => {
    if(err) throw err;
    res.json(results);
})});

//get dogs en adopcion
app.get('/get-adopdata',(req, res) => {
  let sql = 'SELECT * FROM perro_adopcion';
  conn.query(sql, [0], (err, results) => {
    if(err) throw err;
    res.json(results);
  })
});

//get turns
app.get('/get-turndata',(req, res) => {
  let sql = 'SELECT * FROM turno';
  conn.query(sql, [0], (err, results) => {
    if(err) throw err;
    res.json(results);
  })
});




//settings
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () =>{
  console.log('server en puerto', app.get('port'));

})