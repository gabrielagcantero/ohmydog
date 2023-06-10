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

//trae los perros y los devuelve en un array
function getDogs(){
    const dogs = [];

    fetch('http://localhost:3000/get-ownerdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => dogs.push(e))});
    
    return dogs;
}

let clients = getClients();
let dogs = getDogs();

function Clients(){
    let[showClients, setShowClients] = useState(false);
    let[showCLientData, setShowClientData] = useState(null);
    let[showDogs, setShowDogs] = useState(null);

    //muestra/oculta los clientes
    const muestraClients = () => {
        setShowClients(!showClients);         
    }

    //muestra la lista de perros de un cliente
    const dogList = (showDogs,setShowDogs) => {
        let l = dogs.filter((d) => d.owner === showDogs);
        let children;
        //si hay perros devuelve la lista
        if (l.length > 0){ 
            children = l.map((e) => {
                return( 
                    <div className="col-10" style={{marginLeft: "30px"}}>
                        <h6 className="card-title2 mbr-fonts-style m-0 mb-3 display-4">
                            <button value={e.id} className="btn btn-success" >Ver perro</button>
                            <strong>{e.name}</strong> 
                        </h6>
                    </div>
                )})}
        //si no hay clientes devuelve mensaje
        else{ 
            children = (
                <div className="col-12 col-md" style={{marginLeft: "30px"}}>
                    <h6 className="card-title2 mbr-fonts-style m-0 mb-3 display-4">
                        <strong>En este momento el cliente no posee perros registrados en el sistema</strong> 
                    </h6>
                </div>
        )}
        
        return children;
    }


    //muestra los datos del cliente
    const clientData = (mail, showDogs, setShowDogs) => {

        //muestra/oculta los perros del cliente
        const mostrarListaP = (event) => {showDogs? setShowDogs(null) : setShowDogs(event.target.value)};

        let c = clients.find((p) => p.mail === mail);
        return (
            <div>
                <h6 className="card-title2 mbr-fonts-style mb-3 display-7">
                    <strong>Nombre: {c.frist_name} </strong> 
                </h6>
                <h6 className="card-title2 mbr-fonts-style mb-3 display-7">
                    <strong>Apellido: {c.last_name} </strong> 
                </h6>
                <h6 className="card-title2 mbr-fonts-style mb-3 display-7">
                    <strong>Fecha de nacimiento: {(c.nac).substring(0,10)} </strong> 
                </h6>
                <h6 className="card-title2 mbr-fonts-style mb-3 display-7">
                    <strong>Email: {c.mail} </strong> 
                </h6>
                <h6 className="card-title2 mbr-fonts-style mb-3 display-7">
                    <strong>Teléfono: {c.tel} </strong> 
                </h6>
                <button value={c.mail} className="btn btn-success" onClick={mostrarListaP}>Ver perros de {c.frist_name}</button>
                {c.mail ===  showDogs && (dogList(showDogs, setShowDogs))}
                <br/><br/>
            </div>
        )
    }
    
    const clientList = (showCLientData, setShowClientData, showDogs,setShowDogs) => {
        let children;
    
        //muestra/oculta los datos del cliente
        const mostrarCliente = (event) => {showCLientData? setShowClientData(null) : setShowClientData(event.target.value)};
    
        //si hay perros devuelve la lista
        if (clients.length > 0){ 
            children = clients.filter((c) => c.veter === 0).map((e) => {
                return( 
                    <div className="col-10 ">
                        <h6 className="card-title2 mbr-fonts-style m-0 mb-3 display-4">
                            <button value={e.mail} className="btn btn-success" onClick={mostrarCliente}>Ver Cliente</button>
                            <strong>{e.mail}</strong> 
                        </h6>
                        {e.mail ===  showCLientData && clientData(e.mail, showDogs, setShowDogs)}
                    </div>
                )})}
        //si no hay clientes devuelve mensaje
        else{ 
            children = (
                <div className="col-12 col-md">
                    <h6 className="card-title2 mbr-fonts-style m-0 mb-3 display-4">
                        <strong>En este momento no hay clientes registrados en el sistema</strong> 
                    </h6>
                </div>
        )}
        
        return children;
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
                        <div >
                            <div className="card-wrapper">
                                <div className="row align-items-center">
                                        {clientList(showCLientData, setShowClientData, showDogs, setShowDogs)}
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