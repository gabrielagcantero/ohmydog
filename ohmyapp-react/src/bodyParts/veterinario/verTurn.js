import React, { useState } from "react";

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

//crea las opciones del select con los mails de los clientes
function turnList() {
    const children = turns.filter((e) => new Date(e.day).getTime() >= new Date().getTime()).sort((a,b) => new Date(a.day).getTime() - new Date(b.day).getTime()).map((t) => {
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
        </div>)})
    return children;
}

function Turnos(){
    let [showTurn, setShowTurn] = useState(false);

    const muestraTurnos = () => {setShowTurn(!showTurn)}; //muestra/oculta el formulario

    const myTurns = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={muestraTurnos}></span> 
            <div class="container">
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Próximos Turnos</strong>
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
                        <span className="mbr-iconfont mobi-mbri-clock mobi-mbri" onClick={muestraTurnos}></span>
                    </div>
                    <h5 className="card-title mbr-fonts-style display-7"><strong>Ver turnos</strong></h5>
                    <p className="card-text mbr-fonts-style display-7">ver los turnos asignados</p>
                </div>
            </div>
        </div>
    )

    return <>{showTurn ? myTurns : cardTurns}</>
}

export default Turnos;
