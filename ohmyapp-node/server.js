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


/*
  ******************* CARGA DE DATOS ***************************************************************
*/

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


/*add new dog
  PERRO -> sql1 = INSERT INTO perro(owner, name, breed, sex, nac, obs, cruza, image) VALUES(d.owner, d.name, d.breed, d.sex, d.nac, d.obs, true, d.image)
*/
app.post('/store-dogdata',(req, res) => {
  let d = req.body;
  let data = [d.owner, d.name, d.breed, d.sex, d.nac, d.obs, true, d.image];
  let sql = "INSERT INTO perro(owner, name, breed, sex, nac, obs, cruza, image) VALUES(?,?,?,?,?,?,?,?)";
  conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
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

/*
  Agregar una enfermedad
  consulta: INSERT INTO enfermedad(id_perro, nombre) VALUES(id_perro, nombre)
 */
app.post('/store-enfermedad',(req, res) => {
  let d = req.body;
  let data = [d.id_perro, d.enf];
  let sql = "INSERT INTO enfermedad(id_perro, nombre) VALUES(?,?)";
  conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

/*
  Agregar una vacuna
  consulta: INSERT INTO vacuna(id_perro, nombre, dosis, fecha, tipo) VALUES(d.id_perro, d.nombre, d.dosis, d.fecha, d.tipo)
 */
app.post('/store-vacuna',(req, res) => {
  let d = req.body;
  let data = [d.id_perro, d.nombre, d.dosis, d.fecha, d.tipo];
  let sql = "INSERT INTO vacuna(id_perro, nombre, dosis, fecha, tipo) VALUES(?,?,?,?,?)";
  conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

/*
  Agregar una antiparasitario
  consulta: INSERT INTO antiparasitario(id_perro, nombre, cant, date) VALUES(d.id_perro, d.nombre, d.cant, d.date)
 */
app.post('/store-antiparasitario',(req, res) => {
  let d = req.body;
  let data = [d.id_perro, d.nombre, d.cant, d.date];
  let sql = "INSERT INTO antiparasitario(id_perro, nombre, cant, date) VALUES(?,?,?,?)";
  conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
  
/*
  Agregar un vinuclo de perro en adopcion con la persona que lo adopto 
  BODY -> id_perroadop | mail
  consulta: INSERT INTO adopciones(id_perro, id_persona) VALUES(id_perroad, mail)
 */
  app.post('/store-adopciones', (req, res) => {
    let d = req.body;
    let data = [d.id_perroadop, d.mail];
    let sql = "INSERT INTO adopciones(id_perro, id_persona) VALUES(?,?)"
    conn.query(sql, data, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

/*  
  agrega una urgencia a la BD  -> seteo el atendido en 1 y aceptar en 1
  BODY -> "mail", "day", "id_perro" y "obs"
  consulta: INSERT INTO turno(id_perro, id_persona) VALUES(?,?)
*/





/*
    ************ ELIMINACIONES ******************************************************** 
*/


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

/*  elimina las referencias a las adopciones de un perro en adopcion
  BODY -> id_perroadop
*/
app.post('/delete-adopciones',(req, res) => {
  let id = req.body.id_perroadop;
  let sql = 'DELETE FROM adopciones where id_perro ="' + id + '"';
  conn.query(sql, [0], (err, results) => {
    if(err) throw err;
    res.json(results);
  })
  });


/*
  Modificar perro por consulta normal
  campos: peso y obs
  consultas:
  1. UPDATE perro set peso = peso  WHERE id = "id_perro"
  2. UPDATE turno set observaciones = obs,  WHERE id = "id_perro"
*/
app.post('/consulta-dog', (req, res) => {
  let id_perro = req.body.id_perro;
  let peso = req.body.peso;
  let sql = 'UPDATE perro set peso = "'+ peso +'"  WHERE id = "'+id_perro+'"';
  conn.query(sql, (err, result) => {
    if(err) throw err;
    res.json(result);
  });
});


/*
  Modificar perro a castrado
  campos: castrado y obs
  consulta: UPDATE perro set castrado = "1", obs = obs  WHERE id = "id_perro"
*/
app.post('/castrar-dog', (req, res) => {
  let id_perro = req.body.id_perro;
  let sql = 'UPDATE perro set castrado = 1 WHERE id = "'+id_perro+'"';
  conn.query(sql, (err, result) => {
    if(err) throw err;
    res.json(result);
  });
});



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

//guarda observaciones de un turno
app.post('/store-obs', (req, res) => {
  let id_turno = req.body.id_turno;
  let obs = req.body.obs;
  let sql = 'UPDATE turno set observaciones = "'+ obs +'"  WHERE id = "'+id_turno+'"';
  conn.query(sql, (err, result) => {
    if(err) throw err;
    res.json(result);
  });
});

/*
  Modificar turno a atendido
  campos: atendido
  consulta: UPDATE turno set atendido = "1"  WHERE id = "id_turn"
*/
app.post('/attended-turn', (req, res) => {
  let id_turno = req.body.id_turno;
  let sql = 'UPDATE turno set atendido = "1"  WHERE id = "'+id_turno+'"';
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
  devuelve SOLO los clientes con toda su data
  SELECT * FROM persona WHERE veter = "0"
*/
app.get('/get-only-clientdata',(req, res) => {
  let sql = 'SELECT * FROM persona WHERE veter = "0"';
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

//get enfermedades
app.get('/get-ills',(req, res) => {
  let sql = 'SELECT * FROM enfermedad';
  conn.query(sql, [0], (err, results) => {
    if(err) throw err;
    res.json(results);
  })
});

//get antiparasitario
app.get('/get-antiP',(req, res) => {
  let sql = 'SELECT * FROM antiparasitario';
  conn.query(sql, [0], (err, results) => {
    if(err) throw err;
    res.json(results);
  })
});

//get vacuna
app.get('/get-vacuna',(req, res) => {
  let sql = 'SELECT * FROM vacuna';
  conn.query(sql, [0], (err, results) => {
    if(err) throw err;
    res.json(results);
  })
});

//get adopciones
app.get('/get-adopciones',(req, res) => {
  let sql = 'SELECT * FROM adopciones';
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

/*
  modificaciones
    nueva BD
    
  metodos agregados
    POST  delete-adopciones
    GET   get-adopciones  











    POST attended-turn -> pone en 1 el campo atendido de la tabla turnos
    POST store-enfermedad
    POST store-vacuna
    POST store-antiparasitario
    POST castrar-dog
    POST consulta-dog
  

*/



