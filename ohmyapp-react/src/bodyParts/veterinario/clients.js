import React, { useState } from "react";

//trae los mails de los clientes y los devuelve en un array
function getClients(){
    let mails= [];

    fetch('http://localhost:3000/get-clientdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => mails.push(e));
        });

    return mails;
}

let clients = getClients();

const clientList = () => {
    let children;
    //si hay perros devuelve la lista
    if (clients.length > 0){ 

        children = clients.filter((c) => c.veter === 0).map((e) => {
            return( 
                <h6 className=" card-title2 mbr-fonts-style m-0 mb-3 display-4">
                    <button value={e.mail} className="btn btn-success">Ver Cliente</button>
                    <strong>{e.mail}</strong> 
                </h6>
            )})}
    //si no hay clientes devuelve mensaje
    else{ 
        children = (
            <h6 className="card-title2 mbr-fonts-style m-0 mb-3 display-4">
                <strong>En este momento no hay clientes registrados en el sistema</strong> 
            </h6>
    )}
    
    return children;
}

function Clients(){
    let[showClients, setShowClients] = useState(false);

    //muestra/oculta los turnos
    const muestraClients = () => {
        setShowClients(!showClients);         
    }

    const myClients = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <div class="container">
                <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={muestraClients}></span> 
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Listado de clientes</strong>
                    </h3>
                    <div className="container">
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="row align-items-center">
                                    <div className="col-10 col-md">
                                        {clientList()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

    const cardClients = (
        <div className="card col-12 col-md-6 col-lg-3">
            <div className="card-wrapper">
                <div className="card-box align-center">
                    <div className="iconfont-wrapper">
                        <span className="mbr-iconfont mobi-mbri-user mobi-mbri" onClick={muestraClients}></span>
                    </div>
                    <h5 className="card-title mbr-fonts-style display-7"><strong>Ver Cliente</strong></h5>
                    <p className="card-text mbr-fonts-style display-7">Seleccione el cliente que desee ver.</p>
                </div>
            </div>
        </div>
    );

    return (showClients? cardClients : myClients);
}

export default Clients;