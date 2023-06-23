import React from "react";

//trae los perros y los guarda en un array
function getDogs(){
    const dogs = [];

    fetch('http://localhost:3000/get-ownerdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => dogs.push(e))});
    
    return dogs;
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

//trae las enfermedades y las guarda en un array
function getIlls(){
    const ills= [];

    fetch('http://localhost:3000/get-ills')
        .then((response) => response.json())
        .then((results) => {results.map((e) => ills.push(e));
        });
    
    return ills;
}

//trae los antiparasitarios y las guarda en un array
function getAntiP(){
    const antiP= [];

    fetch('http://localhost:3000/get-antiP')
        .then((response) => response.json())
        .then((results) => {results.map((e) => antiP.push(e));
        });
    
    return antiP;
}

//trae las vacunas y las guarda en un array
function getVacunas(){
    const vacunas= [];

    fetch('http://localhost:3000/get-vacuna')
        .then((response) => response.json())
        .then((results) => {results.map((e) => vacunas.push(e));
        });
    
    return vacunas;
}

let dogs = getDogs();
let turns = getTurns();
let ills = getIlls();
let antiP = getAntiP();
let vacunas = getVacunas();

//muestra el peso del perro
function peso(peso){
    let children;
    peso? children = peso + " kilos" : children ="Aún no se ha registrado un peso para este perro."
    return children;
}

//muestra las enfermedades del perro
function enfermedades(dog){
    let ill = ills.filter((e => e.perro === dog));
    let children;
    if (ill.length > 0)
        children = (ill.map((i) => <li style={{width: "98%"}} className="card-title2 mbr-fonts-style m-0 mb-3 display-4">{i.nombre}</li>))
    else
        children =<p style={{width: "98%"}} className="card-title2 mbr-fonts-style m-0 mb-3 display-4">Aún no se han registrado enfermedades para este perro.</p>
    return children;
}

//muestra los antiparasitarios del perro
function antiParasit(dog){
    let myAntiP = antiP.filter((e => e.perro === dog));
    let children;
    if (myAntiP.length > 0){
        children = myAntiP.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).map((e) => {
            return (
                    <li style={{width: "98%"}} className="card-title2 mbr-fonts-style m-0 mb-3 display-4">
                        <strong>Nombre: </strong>{e.nombre} 
                        <strong>   Cantidad: </strong>{e.cant} ml.  
                        <strong>   Fecha: </strong>{e.fecha.substring(0,10)}
                    </li>
            )
        })
    }
    else
        children =<p style={{width: "98%"}} className="card-title2 mbr-fonts-style m-0 mb-3 display-4">Aún no se han aplicado antiparasitarios a este perro.</p>
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

//muestra las vacunas A del perro
function vacunasA(dog){
    let vac = vacunas.filter((e => (e.perro === dog) && (e.tipo === 'A')));
    let children;
    if (vac.length > 0){
        children = vac.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).map((e) => {
            return (
                    <li style={{width: "98%"}} className="card-title2 mbr-fonts-style m-0 mb-3 display-4">
                        <strong>Nombre: </strong>{e.nombre} 
                        <strong>   Dosis: </strong>{e.dosis}  
                        <strong>   Fecha: </strong>{e.fecha.substring(0,10)}
                    </li>
            )
        })
    }
    else
        children =<p style={{width: "98%"}} className="card-title2 mbr-fonts-style m-0 mb-3 display-4">Aún no se han aplicado vacunas tipo A a este perro.</p>
    return children;
}

//muestra las vacunas A del perro
function vacunasB(dog){
    let vac = vacunas.filter((e => (e.perro === dog) && (e.tipo === 'B')));
    let children;
    if (vac.length > 0){
        children = vac.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).map((e) => {
            return (
                    <li style={{width: "98%"}} className="card-title2 mbr-fonts-style m-0 mb-3 display-4"> 
                        <strong>Fecha: </strong>{e.fecha.substring(0,10)}
                    </li>
            )
        })
    }
    else
        children =<p style={{width: "98%"}} className="card-title2 mbr-fonts-style m-0 mb-3 display-4">Aún no se han aplicado vacunas contra la rabia a este perro.</p>
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
                            <span className="card-title2">{peso(myDog.peso)}</span>
                        </h6>
                        <h6  className="card-title mbr-fonts-style m-0 mb-3 display-4">
                            <strong>Castrado: </strong>
                            <span className="card-title2">{myDog.castrado? "Sí" : "No"}</span>
                        </h6>
                        <h6  className="card-title mbr-fonts-style m-0 mb-3 display-4">
                            <strong>Enfermedades</strong>
                        </h6>
                        {enfermedades(dog)}
                        <h6  className="card-title mbr-fonts-style m-0 mb-3 display-4">
                            <strong>Antiparasitario</strong>
                        </h6>
                        {antiParasit(dog)}
                        <h6  className="card-title mbr-fonts-style m-0 mb-3 display-4">
                            <strong>Vacunas Tipo A</strong>
                        </h6>
                        {vacunasA(dog)}
                        <h6  className="card-title mbr-fonts-style m-0 mb-3 display-4">
                            <strong>Vacunas Tipo B</strong>
                        </h6>
                        {vacunasB(dog)}
                        <h6  className="card-title mbr-fonts-style m-0 mb-3 display-4">
                            <strong>Historial de turnos</strong>
                        </h6>
                        {Turnos(dog)}
                </div>
            </div>
        </section>
)}

export default Libreta;