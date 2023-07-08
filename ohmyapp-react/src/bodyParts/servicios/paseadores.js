import React, { useState } from "react";

function getPaseadores(){
    const paseadores = [];

    fetch('http://localhost:3000/get-paseadores')
        .then((response) => response.json())
        .then((results) => {results.map((e) => paseadores.push(e))});
    
    return paseadores;
}

let pas = getPaseadores();

//arma la lista de paseadores
const pasList = () => {
    let children;

    //si hay paseadores devuelve la lista
    if (pas.length > 0){ 
        children = pas.map((e) => {
            return( 
                <div className="col-10 ">
                    <h6 className="card-title2 mbr-fonts-style m-0 mb-3 display-4">
                        <strong>{e.frist_name} {e.last_name} </strong>
                        <button value={e.email} className="btn btn-success" >Contactar</button> 
                    </h6>
                    <div>
                        <h6 className="card-title2 mbr-fonts-style mb-3 display-7">
                            <strong>Zona: {(e.zona)} </strong> 
                        </h6>
                        <h6 className="card-title2 mbr-fonts-style mb-3 display-7">
                            <strong>Email: {e.email} </strong> 
                        </h6>
                        <h6 className="card-title2 mbr-fonts-style mb-3 display-7">
                            <strong>Teléfono: {e.telefono} </strong> 
                        </h6>
                        <br/><br/>
                    </div>
                </div>
            )})}
    //si no hay clientes devuelve mensaje
    else{ 
        children = (
            <div className="col-12 col-md">
                <h6 className="card-title2 mbr-fonts-style m-0 mb-3 display-4">
                    <strong>En este momento no hay paseadores registrados en el sistema</strong> 
                </h6>
            </div>
    )}
    
    return children;
}

function Paseadores(){
    let [showPaseadores, setShowPaseadores] = useState(false);

    //muestra/oculta los clientes
    const muestraPaseadores = () => {
        setShowPaseadores(!showPaseadores);         
    }

    //muestra los paseadores
    const myPaseadores = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <div class="container">
                <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={muestraPaseadores}></span> 
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Listado de paseadores</strong>
                    </h3>
                    <div className="container">
                        <div >
                            <div className="card-wrapper">
                                <div className="row align-items-center">
                                        {pasList()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

    //tarjeta de ver paseadores
    const cardPaseadores = (
        <div className="card col-12 col-md-6 col-lg-3">
            <div className="card-wrapper">
                <div className="card-box align-center">
                    <div className="iconfont-wrapper">
                        <span className="mbr-iconfont mbrib-sun" onClick={muestraPaseadores}></span>
                    </div>
                    <h5 className="card-title mbr-fonts-style display-7"><strong>Paseadores</strong></h5>
                    <p className="card-text mbr-fonts-style display-7">Vea datos de los paseadores y contáctelos.</p>
                </div>
            </div>
        </div>
    );

    return (showPaseadores? myPaseadores : cardPaseadores);
}

export default Paseadores;