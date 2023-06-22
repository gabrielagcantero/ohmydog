import React from "react";

//trae los perros y los guarda en un array
function getDogs(){
    const dogs = [];

    fetch('http://localhost:3000/get-ownerdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => dogs.push(e))});
    
    return dogs;
}

//trae las libretas y las guarda en un array
function getLibretas(){
    const libretas = [];

    fetch('http://localhost:3000/get-libreta')
        .then((response) => response.json())
        .then((results) => {results.map((e) => libretas.push(e))});
    
    return libretas;
}

//trae los turnos y los guarda en un array
function getTurns(){
    const turns= [];

    fetch('http://localhost:3000/get-turndata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => turns.push(e));
        });
    
    return turns;
}

let dogs = getDogs();
let libretas = getLibretas();
let turns = getTurns();

//muestra el peso del perro
function peso(dog){
    let perro = libretas.find((e => e.id_perro === dog));
    let children;
    if (perro)
        children = perro.peso + " kilos"
    else
        children ="Aún no se ha registrado un peso para este perro."
    return children;
}

//muestra las enfermedades del perro
function enfermedades(dog){
    let perro = libretas.filter((e => e.id_perro === dog));
    let children;
    if (perro.length > 0)
        children = (perro.map((p) => <li className="list-group-item card-title2 mbr-fonts-style m-0 mb-3 display-4">{p.enfermedad}</li>))
    else
        children =<p>Aún no se han registrado enfermedades para este perro.</p>
    return children;
}

function Turnos(dog){
    let turnos = turns.filter((e => (e.dog === dog) && (e.atendido === 1)));
    let children;
    if (turnos.length > 0){
        children = turnos.map((t) => {
            return (
                <div style={{width: "98%"}}>
                    <h6 className="card-title2 mbr-fonts-style m-0 mb-3 display-4"><strong>Turno del día {t.day.substring(0,10)} por la {t.hour}</strong></h6>
                    <p className="card-title2 mbr-fonts-style m-0 mb-3 display-4"><strong>Observaciones: </strong>{t.observaciones? t.observaciones : "No hay observaciones"}</p>
                </div>
            )
        })
    } else
        children =<p style={{width: "98%"}} className="card-title2 mbr-fonts-style m-0 mb-3 display-4">Aún no se han registrado turnos para este perro.</p>;
    return children;
}

function Libreta({ dog }){
    let myDog = dogs.find((d => d.id === dog));
    return(
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo">
            <div class="container">
                <div class="mbr-section-head">
                    <h6 class="card-title mbr-fonts-style align-center mb-0 display-3">
                        <strong>Libreta sanitaria de {myDog.name}</strong>
                    </h6>
                </div>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                        <h6  className="card-title mbr-fonts-style m-0 mb-3 display-4">
                            <strong>Peso: </strong>
                            <span className="card-title2">{peso(dog)}</span>
                        </h6>
                </div>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                        <h6  className="card-title mbr-fonts-style m-0 mb-3 display-4">
                            <strong>Enfermedades</strong>
                        </h6>
                        <ul class="list-group list-group-flush">
                        {enfermedades(dog)}
                        </ul>
                </div>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                        <h6  className="card-title mbr-fonts-style m-0 mb-3 display-4">
                            <strong>Antiparasitario</strong>
                        </h6>
                </div>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                        <h6  className="card-title mbr-fonts-style m-0 mb-3 display-4">
                            <strong>Vacunas Tipo A</strong>
                        </h6>
                </div>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                        <h6  className="card-title mbr-fonts-style m-0 mb-3 display-4">
                            <strong>HiVacunas Tipo B</strong>
                        </h6>
                </div>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                        <h6  className="card-title mbr-fonts-style m-0 mb-3 display-4">
                            <strong>Historial de turnos</strong>
                        </h6>
                        {Turnos(dog)}
                </div>
            </div>
        </section>
)}

export default Libreta;