import React, { useState } from "react";

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

let turns = getTurns();
let dogs = getDogs();

//guarda el turno modificado en la BD
function exportTurn(datosCompletos){
    let exported = false;
    //controles
    if (new Date(datosCompletos.day).getTime() < new Date().getTime()){ //controla la fecha
        alert("La fecha del turno debe ser posterior a la fecha actual");
    } else {
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
            exported = true;
        }
    }
    return exported;
}

//elimina un turno
function eliminarTurno(event){
    let myBody = JSON.stringify({"value": event.target.value});
    //lo lleva a la BD
    fetch('http://localhost:3000/delete-turndata', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: myBody})
        .then(function(response) {return response.json();});

    alert ("el turno ha sido eliminado");
    window.location.href = window.location.href;
}

//elimina un turno modificado
function eliminarTurnoModif(id){
    let myBody = JSON.stringify({"value": id});
    //lo lleva a la BD
    fetch('http://localhost:3000/delete-turndata', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: myBody})
        .then(function(response) {return response.json();});
}

//pide confirmación antes de eliminar
const consultar = (event) => {
    window.confirm("Está seguro que desea eliminar éste turno?") && eliminarTurno(event);
}

//arma la lista de turnos con los botones de cancelar y modificar
function turnList(showForm, setShowForm) {
    let user = JSON.parse(localStorage.getItem("user")).mail;
    let filteredTurns = turns.filter((e) => (e.client === user && new Date(e.day).getTime() >= new Date().getTime())).sort((a,b) => new Date(a.day).getTime() - new Date(b.day).getTime());
    let children;

    //muestra el formulario para modificar turno
    const mostrarModif = (event) => {setShowForm(event.target.value)};

    //oculta el formulario para modificar turno
    const ocultarModif = () => {setShowForm(null)};

    //cuadro de confirmación
    const consultarModif = (event) => {window.confirm("Tenga en cuenta que el veterinario debe aceptar la modificación. \nDesea continuar?") && mostrarModif(event)};

    //agenda el nuevo turno y elimina el viejo. mantiene dueño, perro y motivo del turno viejo
    const modificarTurno = (event) =>{
        event.preventDefault();
        const datos = new FormData(event.target); //toma los datos del formulario
        const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto
        if (exportTurn(datosCompletos)){ 
            alert("la solicitud ha sido enviada"); //agenda el nuevo turno
            eliminarTurnoModif(datosCompletos.idTurnoViejo); //elimina el turno viejo
            turns = getTurns();
            window.location.href = window.location.href;
        }
    }

    //formulario para modificar el turno
    const modifForm = (t) => {
        return (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo">
            <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={ocultarModif} ></span> 
            <div class="container">
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Modificación de turno</strong>
                    </h3>
                </div>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                    <div class="col-lg-12 mx-auto mbr-form">
                        <form onSubmit={modificarTurno} class="mbr-form form-with-styler mx-auto">
                            <div class="dragArea row">
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <label for="day" >Seleccione la nueva fecha</label>
                                    <input type="date" name="day" class="form-control" required />
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <select name="time" class="form-control" required>
                                        <option value="" selected disabled>Seleccione la nueva franja horaria</option>
                                        <option value="mañana">mañana (8 a 13hs)</option>
                                        <option value="tarde">tarde (15 a 17.30hs)</option>
                                        <option value="noche">noche (17.30 a 20hs)</option>
                                    </select> 
                                    <input name="idTurnoViejo" type="hidden" value={t.id} />
                                    <input name="client" type="hidden" value={t.client} />
                                    <input name="dog" type="hidden" value={t.dog} />
                                    <input name="motive" type="hidden" value={t.motive} />
                                </div>
                                <div class="col-auto mbr-section-btn align-center">
                                    <button type="submit" class="btn btn-info display-4"  style={{width: "50%", margin: "auto"}}>Modificar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )};

    //si hay turnos devuelve la lista
    if (filteredTurns.length > 0){ 
        children = filteredTurns.map((t) => {
            let dogName = dogs.filter((d) => d.id === t.dog).map((n) => n.name);
            return ( 
                <div className="container">
                    <div className="card">
                        <div className="card-wrapper">
                            <div className="row align-items-center">
                                <div className="col-10 col-md">
                                    <div className="card-box">
                                        <h5 className=" card-title2 mbr-fonts-style m-0 mb-3 display-5">
                                            <strong>{t.day.substring(0,10)} por la {t.hour} </strong> 
                                            <button value={t.id} className="btn btn-success" onClick={consultarModif} >Modificar turno</button>
                                            <button value={t.id} className="btn btn-danger" onClick={consultar}>Cancelar turno</button>
                                        </h5>
                                        <h6 className=" card-title2 mbr-fonts-style m-0 mb-3 display-4">
                                            <strong>{t.aceptar === 0 && "(Pendiente de aprobación)"}</strong>
                                        </h6>
                                        <h6 className="card-subtitle mbr-fonts-style mb-3 display-4">
                                            <strong>Perro: {dogName}</strong> 
                                        </h6>
                                        <h6 className="card-subtitle mbr-fonts-style mb-3 display-4">
                                            <strong>Motivo: {t.motive} </strong> 
                                        </h6>
                                    </div>
                                </div>
                                {String(t.id) === showForm && modifForm(t)}
                            </div>
                        </div>
                    </div>
                </div>)})}
    //si no hay turnos devuelve mensaje
    else{ 
        children = (<div className="container">
            <div className="card">
                <div className="card-wrapper">
                    <div className="row align-items-center">
                        <div className="col-10 col-md">
                            <div className="card-box">
                                <h5 className=" card-title2 mbr-fonts-style m-0 mb-3 display-5">
                                    <strong>Usted no posee turnos solicitados</strong> 
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
    
    return children;
}

function MisTurnos(){
    let [showTurn, setShowTurn] = useState(false); 
    let [showForm, setShowForm] = useState(null);

    //muestra/oculta los turnos
    const muestraTurnos = () => {
        setShowTurn(!showTurn);         
    }

    //turnos del cliente
    const myTurns = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={muestraTurnos}></span> 
            <div class="container">
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Mis Turnos</strong>
                    </h3>
                </div>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                        {turnList(showForm, setShowForm)}
                </div>
            </div>
        </section>
    )

    //tarjeta de ver turnos
    const cardMyTurns = (
        <div className="card col-12 col-md-6 col-lg-3">
            <div className="card-wrapper">
                <div className="card-box align-center">
                    <div className="iconfont-wrapper">
                        <span className="mbr-iconfont mobi-mbri-clock mobi-mbri" onClick={muestraTurnos}></span>
                    </div>
                    <h5 className="card-title mbr-fonts-style display-7"><strong>Mis turnos</strong></h5>
                    <p className="card-text mbr-fonts-style display-7">Vea o cancele sus turnos.</p>
                </div>
            </div>
        </div>
    );

    return <>{showTurn ? myTurns : cardMyTurns}</>
}

export default MisTurnos;
