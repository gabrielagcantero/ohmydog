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

/*
Elimina el turno seleccionado
*/
function rechazarTurno(event){

    const datos = new FormData(event.target); //toma los datos del formulario
    const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto

    let turnoElim = JSON.stringify(datosCompletos);
    //lo elimino de la BD
    fetch('http://localhost:3000/delete-turndata', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: turnoElim
    }).then(function(response) {
        return response.json();
    });

    //tiro alerta para visualizar la confirmacion del la eliminacion del turno
    alert("El turno ha sido eliminado correctamente");
    //no entiendo bien para que sirven estas ultimas 2 lineas pero como estan en las otras altas/modificaciones las dejo
    turns = getTurns();
    window.location.href = window.location.href; 
}

/*
Aceptar turno
*/
function aceptarTurno(event){
    let acceptTurn = JSON.stringify({id: event.target.value});
    //seteo "aceptar" en 1 -> true
    //lo implemento con u UPDATE en el back
    fetch('http://localhost:3000/accept-turn', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: acceptTurn
    }).then(function(response) {
        return response.json();
    });
    //tiro alerta para visualizar la confirmacion del la aceptacion del turno
    alert("El turno ha sido aceptado correctamente");
    turns = getTurns(); // vuelve a pedir los turnos para que se agreguen las modificaciones
    window.location.href = window.location.href; //refresca la página

}

//arma la lista de turnos
function turnList() {
let filteredTurns = turns.filter((e) => (e.aceptar !== 1 && new Date(e.day).getTime() >= new Date().getTime())).sort((a,b) => new Date(a.day).getTime() - new Date(b.day).getTime());
let children;
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
                                        <button value={t.id} className="btn btn-success" onClick={aceptarTurno} >Aceptar turno</button>
                                        <button value={t.id} className="btn btn-danger" >Rechazar turno</button> 
                                    </h5>
                                    <h6 className="card-subtitle mbr-fonts-style mb-3 display-4">
                                        <strong>cliente: {t.client}</strong> 
                                    </h6>
                                    <h6 className="card-subtitle mbr-fonts-style mb-3 display-4">
                                        <strong>Perro: {dogName}</strong> 
                                    </h6>
                                    <h6 className="card-subtitle mbr-fonts-style mb-3 display-4">
                                        <strong>Motivo: {t.motive} </strong> 
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)})}
//si no hay turnos devuelve mensaje
else{ 
    children = (
        <div className="container">
            <div className="card">
                <div className="card-wrapper">
                    <div className="row align-items-center">
                        <div className="col-10 col-md">
                            <div className="card-box">
                                <h5 className=" card-title2 mbr-fonts-style m-0 mb-3 display-5">
                                    <strong>En este momento no hay turnos pendientes de aprobación</strong> 
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

function Aceptar(){
let [showTurn, setShowTurn] = useState(false);

//muestra/oculta el formulario
const muestraTurnos = () => {setShowTurn(!showTurn)}; 

const myTurns = (
    <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
        <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={muestraTurnos}></span> 
        <div class="container">
            <div class="mbr-section-head">
                <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                    <strong>Turnos solicitados</strong>
                </h3>
            </div>
            <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                    {turnList()}
            </div>
        </div>
    </section>
)

const cardTurns = (
    <div className="card col-12 col-md-6 col-lg-3">
        <div className="card-wrapper">
            <div className="card-box align-center">
                <div className="iconfont-wrapper">
                    <span className="mbr-iconfont mobi-mbri-calendar mobi-mbri" onClick={muestraTurnos}></span>
                </div>
            <h5 className="card-title mbr-fonts-style display-7"><strong>Aceptar turnos</strong></h5>
            
                <p className="card-text mbr-fonts-style display-7">Aceptar o rechazar los turnos solicitados.</p>
            </div>
        </div>
    </div>
    );

    return <>{showTurn ? myTurns : cardTurns}</>
    
}

export default Aceptar;