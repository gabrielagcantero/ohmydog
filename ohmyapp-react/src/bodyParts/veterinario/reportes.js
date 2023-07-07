import React, { useState, useEffect } from "react";

//trae los turnos y los guarda en un array
function getTurns(){
    const turns= [];

    fetch('http://localhost:3000/get-turndata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => turns.push(e));
        });
    
    return turns;
}

//trae los perros y los devuelve en un array
function getDogs(){
    const dogs = [];

    fetch('http://localhost:3000/get-ownerdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => dogs.push(e))});
    
    return dogs;
}

//trae los clientes y los devuelve en un array
function getClients(){
    let mails= [];

    fetch('http://localhost:3000/get-clientdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => mails.push(e));
        });

    return mails;
}

let turns = getTurns();
let dogs = getDogs();
let clients = getClients();

//manda vacuna a la BD (de los dos tipos)
function exportVacun(dog_con){
    if (JSON.parse(dog_con).nombre)
    
    fetch('http://localhost:3000/store-vacuna', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: dog_con
    }).then(function(response) {
        return response.json();
    });
}

//antiparasitario a la BD
function exportAntip(dog_con){
    if (JSON.parse(dog_con).nombre)
        fetch('http://localhost:3000/store-antiparasitario', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: dog_con
        }).then(function(response) {
            return response.json();
        }); 
}

//castracion a la BD
function exportCastracion(dog_con){
    if (JSON.parse(dog_con).castrado === "Sí")
    fetch('http://localhost:3000/castrar-dog', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: dog_con
    }).then(function(response) {
        return response.json();
    });
}

//consulta a la BD
function exportConsulta(dog_con){
    //actualiza peso
    fetch('http://localhost:3000/consulta-dog', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: dog_con
    }).then(function(response) {
        return response.json();
    });

    //actualiza enfermedades
    if (JSON.parse(dog_con).enf){
        fetch('http://localhost:3000/store-enfermedad', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: dog_con
        }).then(function(response) {
            return response.json();
        });
    }
}
    
//carga el reporte del turno
function send(event){
    //agarro datos del formulario, creo el objeto
    let datos = new FormData(event.target);
    let datosCompletos = Object.fromEntries(datos.entries());
    
    //agrego el tipo de vacuna si es necesario
    if (datosCompletos.motive === "Vacuna tipo A"){
        datosCompletos.tipo = "A";
        datosCompletos.motive = "Vacuna";
    } else if (datosCompletos.motive === "Vacuna tipo B"){
        if (datosCompletos.vacunado === "Sí"){
            datosCompletos.tipo = "B";
            datosCompletos.nombre = "Antirrábica";
            datosCompletos.dosis = "-";
        }
        datosCompletos.motive = "Vacuna";
    }

    //claculo lo que le queda de la bonificación
    datosCompletos.bonif = Math.max(parseFloat(datosCompletos.bonif) - parseFloat(datosCompletos.total), 0);

    let dog_con = JSON.stringify(datosCompletos); //Jsonifico
    
    //los mando donde corresponda
    switch (datosCompletos.motive){
        case "Consulta": 
            exportConsulta(dog_con);
            break;
        case "Castración":
            exportCastracion(dog_con);
            break;
        case "Vacuna":
            exportVacun(dog_con);
            break;
        case "Desparasitación":
            exportAntip(dog_con);
      }
    //guarda observaciones
    fetch('http://localhost:3000/store-obs', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: dog_con
    }).then(function(response) {
        return response.json();
    });
 
    //pone el turno como atendido
    fetch('http://localhost:3000/attended-turn', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: dog_con
    }).then(function(response) {
        return response.json();
    });

    //update del monto del turno (body: dog_con campos: id_turno, bonif )
    /*fetch('http://localhost:3000/update-monto', {
         method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: dog_con
    }).then(function(response) {
        return response.json(); 
    });*/

    //update del descuento del usuario (body: dog_con campos: client, total )
    /*fetch('http://localhost:3000/update-descuento', {
        method: 'POST',
        headers: {  
            'Content-Type': 'application/json'
        },
        body: dog_con
    }).then(function(response) {
        return response.json();
    });*/

    //emito alerta y mensaje de la HU
    alert("La libreta fue actualizada exitosamente exitosamente.");
    window.location.href = window.location.href;
}

function consultar(event){
    event.preventDefault();
    window.confirm("La información será enviada a la libreta sanitaria del perro.") && send(event);
}

const consulta = (peso, setPeso) => {
    const handleChange = (event) => {
        setPeso(parseFloat(event.target.value)); // Actualizar el valor cuando cambie el input
    };

    return(
        <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
            <label for="peso">Peso en kilos:</label><br/>
            <input type="number" step="0.1" className="form-control" name="peso" placeholder={peso} value={peso} onChange={handleChange} required/><br/>
            <label for="enf">Enfermedad encontrada:</label><br/>
            <input className="form-control" name="enf" placeholder="Dejar en blanco si no se encontró ninguna enfermedad" pattern="[A-Za-z ]{1,50}"/>
        </div>
)};

const castracion = (
    <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
        <label >El perro fue castrado?:</label><br/>
        <input type="radio" name="castrado" value="Sí" />
        <label for="opcion1">Sí</label><br></br>
        <input type="radio" name="castrado" value="No" />
        <label for="opcion1">No</label><br></br>
    </div>
);

const vacunaA = (
    <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
        <label >Ingrese la vacuna aplicada:</label><br/>
        <input className="form-control" name="nombre" pattern="[A-Za-z ]{0,50}" placeholder="Nombre"/><br/>
        <input className="form-control" name="dosis" placeholder="Dosis"/>
    </div>
);

const vacunaB = (
    <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
        <label >Se aplicó la vacuna antirrábica?:</label><br/>
        <input type="radio" name="vacunado" value="Sí" />
        <label for="opcion1">Sí</label><br></br>
        <input type="radio" name="vacunado" value="No" />
        <label for="opcion1">No</label><br></br>
    </div>
);

const desparasitacion = (
    <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
        <label >Ingrese el antiparasitario aplicado:</label><br/>
        <input className="form-control" name="nombre" pattern="[A-Za-z ]{0,50}" placeholder="Nombre"/><br/>
        <input  type="number" className="form-control" name="cant" step="0.1"  placeholder="Cantidad en ml."/>
    </div>
);


//define qué formulario mostrar
//formulario para adoptar perro
function Reportes ({ id, setShowForm }){
    const ocultarForm = () => {setShowForm(null)};

    let myturn = turns.find((t) => t.id === id);
    let myDog = dogs.find((d) => d.id === myturn.dog);
    let myClient = clients.find((c) => c.mail === myturn.client);
    const [peso, setPeso] = useState(myDog.peso);
    const [price, setPrice] = useState(0);
    const [total, setTotal] = useState('');

    const handlePrice = (event) => {
        setPrice(parseFloat(event.target.value)); // Actualizar el valor cuando cambie el input
    }

    //calcula el monto a cobrar
    const calcular = () => {
        setTotal(Math.max(parseFloat(price) - parseFloat(myClient.bonif_donacion), 0));
        console.log(total);
    }

    useEffect(() => {
        // Update the document title using the browser API
        document.getElementById("mytotal").innerText = 'Total a cobrar: $' + total;
      });
    
    return (
    <section data-bs-version="5.1" className="form7 cid-tCtCU4eUuo">
        <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={ocultarForm} ></span> 
        <div className="container">
            <div className="mbr-section-head">
                <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                    <strong>Carga de reporte de turno</strong>
                </h3>
            </div>
            <div className="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                <div className="col-lg-12 mx-auto mbr-form">
                    <form onSubmit={consultar} className="mbr-form form-with-styler mx-auto">
                        <div>   
                            {myturn.motive === "Consulta" && consulta(peso, setPeso)}
                            {myturn.motive === "Castración" && castracion}
                            {myturn.motive === "Vacuna tipo A" && vacunaA}
                            {myturn.motive === "Vacuna tipo B" && vacunaB}
                            {myturn.motive === "Desparasitación" && desparasitacion}
                            <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                <label for="obs">Observaciones:</label><br/>
                                <textarea name="obs" rows="5" class="form-control"></textarea>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 form-group row mb-3" >
                                <p>Bonificación del cliente: ${myClient.bonif_donacion}</p>
                                <div class="form-inline" >
                                    <label for="monto" style={{paddingTop:"5px"}}>Valor de la consulta: $</label>
                                    <input style={{width:"20%", marginLeft:"5px", marginRight:"5px"}} type="number" step="0.01" min="0.00" value={price} onChange={handlePrice} />
                                    <span><button type="button" className="btn-outline-primary btn-sm" onClick={calcular}>Calcular total</button></span>
                                </div>
                                <p></p>
                                <p id="mytotal"></p>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                <input name="id_turno" type="hidden" value={id} />
                                <input name="id_perro" type="hidden" value={myturn.dog} />
                                <input name="motive" type="hidden" value={myturn.motive} />
                                <input name="fecha" type="hidden" value={myturn.day.substring(0,10)} />
                                <input name="total" type="hidden" value={total} />
                                <input name="client" type="hidden" value={myClient.id_persona} />
                                <input name="bonif" type="hidden" value={myClient.bonif_donacion} />
                            </div>
                            <div className="col-auto mbr-section-btn align-center">
                                <button type="submit" class="btn btn-info display-4"  style={{width: "50%", margin: "auto"}}>Enviar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    )};

export default Reportes;

