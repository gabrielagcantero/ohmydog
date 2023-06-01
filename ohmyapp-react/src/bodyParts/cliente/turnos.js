import React, { useState } from "react";

//trae los perros y los devuelve en un array
function getDogs(){
    const dogs = [];

    fetch('http://localhost:3000/get-ownerdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => dogs.push(e))});

    return dogs;
}

function getTurns(){
    const turns= [];

    fetch('http://localhost:3000/get-turndata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => turns.push(e));
        });

    return turns;
}

let dogs = getDogs();
let turns = getTurns();

//guarda en "myTurn" los datos del turno en formato Json y los manda a la BD
//ya no controlamos disponobilidad. despues el vete lo va a aceptar o rechazar
//hay que hacer que mande el mail para aceptar al vete
function exportTurn(event){
    const datos = new FormData(event.target); //toma los datos del formulario
    const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto
    let guardado = false;
    
    //controles
    if (new Date(datosCompletos.day).getTime() < new Date().getTime()){ //controla la fecha
        alert("La fecha del turno debe ser posterior a la fecha actual");
    } else {
            //traigo el mail del dueño y lo agrego a los datos
            datosCompletos.client = JSON.parse(localStorage.getItem("user")).mail;
            let myTurn = JSON.stringify(datosCompletos) //lo paso a JSON

            //controlo que no tenga turno en el mismo dia para el mismo perro
            if (turns.filter((t) => t.dog == datosCompletos.dog && t.day.substring(0,10) === datosCompletos.day).length > 0)
                alert("El perro elegido ya posee un turno para la fecha solicitada");
            else {
                //lo mando a la BD
                fetch('http://localhost:3000/store-turndata', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: myTurn
                }).then(function(response) {
                    return response.json();
                });

                alert("El turno ha sido solicitado.");
                window.location.href = window.location.href;
            }
    }
    return guardado;
}

//crea las opciones del select con los nombres de los perros del usuarrio
function options() {
    let user = localStorage.getItem("user");
    let jsonUser = JSON.parse(user);
    let userMail = jsonUser.mail;
    const children = dogs.filter((e) => e.owner === userMail).map((d) => (
        React.createElement("option", {value: d.id}, d.name)))
    return children;
}

function Turnos(){
    let [showTurnoForm, setShowTurnoForm] = useState(false); 

    const CargaTurno = () => {(dogs.filter(
        (d) => d.owner === JSON.parse(localStorage.getItem("user")).mail)
        .length === 0) ? alert("No es posible solicitar turnos ya que no posee perros registrados") 
        : setShowTurnoForm(!showTurnoForm) //muestra/oculta el formulario controlando que tenga perros
    }; 
    
    const guardar = (event) => {
        event.preventDefault(); //para que no refresque por defecto
        exportTurn(event);
    };

    // formulario para solicitud de turno
    const formTurno = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={CargaTurno}></span> 
            <div class="container">
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Solicitud de turno</strong>
                    </h3>
                </div>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                    <div class="col-lg-12 mx-auto mbr-form">
                        <form onSubmit={guardar} class="mbr-form form-with-styler mx-auto" data-form-title="Carga de cliente" id="cliForm">
                            <div class="dragArea row">
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <select name="dog" class="form-control" required>
                                        <option value="" selected disabled>Seleccione el perro que desea atender</option>
                                        {options()}
                                    </select>  
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <label for="day" >Seleccione el día</label>
                                    <input type="date" name="day" class="form-control" required />
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <select name="time" class="form-control" required>
                                        <option value="" selected disabled>Seleccione la franja horaria</option>
                                        <option value="mañana">mañana (8 a 13hs)</option>
                                        <option value="tarde">tarde (15 a 17.30hs)</option>
                                        <option value="noche">noche (17.30 a 20hs)</option>
                                    </select> 
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <select name="motive" class="form-control" required>
                                        <option value="" selected disabled>Seleccione el motivo del turno</option>
                                        <option value="Consulta">Consulta</option>
                                        <option value="Vacuna tipo A">Vacuna tipo A (prevención)</option>
                                        <option value="Vacuna tipo B">Vacuna tipo B (antirrábica)</option>
                                        <option value="Desparasitación">Desparasitación</option>
                                        <option value="Castración">Castración</option>
                                    </select> 
                                </div>

                                <div class="col-auto mbr-section-btn align-center">
                                    <button type="submit" class="btn btn-info display-4"  style={{width: "50%", margin: "auto"}}>Solicitar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );

    //tarjeta de solicitud de turno
    const cardTurno = (
        <div className="card col-12 col-md-6 col-lg-3">
            <div className="card-wrapper">
                <div className="card-box align-center">
                    <div className="iconfont-wrapper">
                        <span className="mbr-iconfont mobi-mbri-calendar mobi-mbri" onClick={CargaTurno}></span>
                    </div>
                    <h5 className="card-title mbr-fonts-style display-7"><strong>Solicitar turno</strong></h5>
                    <p className="card-text mbr-fonts-style display-7">Solicite turnos para sus perros desde la comodidad de su hogar.</p>
                </div>
            </div>
        </div>
    );

    return <>{showTurnoForm ? formTurno : cardTurno}</>
}

export default Turnos;
