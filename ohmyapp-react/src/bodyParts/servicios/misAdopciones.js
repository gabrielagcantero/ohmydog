import React, { useState } from "react";

//trae los perros y los devuelve en un array
function getAdopDogs(){
    const dogs = [];

    fetch('http://localhost:3000/get-adopdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => dogs.push(e))});
    
    return dogs;
}

let dogs = getAdopDogs();

//borra el perro de la lista
function elimAdop(id){
    let myBody = JSON.stringify({"value": id});
    //lo lleva a la BD
    fetch('http://localhost:3000/delete-dogAdop', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: myBody})
        .then(function(response) {return response.json();});

    alert ("El perro se quitó de la lista de adopciones");
    window.location.href = window.location.href;
}

//cuadro de confirmación
const consultarElim = (event) => {window.confirm("Tenga en cuenta que el perro será quitado de la lista de adopción. \nDesea continuar?") && elimAdop(event.target.value)};

//arma la lista de turnos sin confirmar con los botones de cancelar y modificar
function adopList() {
    let user = JSON.parse(localStorage.getItem("user")).mail;
    let filteredDogs = dogs.filter((e) => (e.owner === user));
    let children;

    //si hay turnos devuelve la lista
    if (filteredDogs.length > 0){ 
        children = filteredDogs.map((d) => {
            return ( 
                <div className="container">
                    <div className="card">
                        <div className="card-wrapper">
                            <div className="row align-items-center">
                                <div className="col-10 col-md">
                                    <div className="card-box">
                                        <h5 className=" card-title2 mbr-fonts-style m-0 mb-3 display-4">
                                            <strong>{d.name} </strong>
                                            <button value={d.id_perroadop} className="btn btn-success" onClick={consultarElim} >Marcar como adoptado</button>
                                             
                                        </h5>
                                        <h6 className="card-subtitle mbr-fonts-style mb-3 display-4">
                                            <strong>Edad: {d.age}</strong> 
                                        </h6>
                                        <h6 className="card-subtitle mbr-fonts-style mb-3 display-4">
                                            <strong>Raza: {d.breed} </strong> 
                                        </h6>
                                        <h6 className="card-subtitle mbr-fonts-style mb-3 display-4">
                                            <strong>Color: {d.color} </strong> 
                                        </h6>
                                        <h6 className="card-subtitle mbr-fonts-style mb-3 display-4">
                                            <strong>Sexo: {d.sex === "m"? "macho" : "hembra"} </strong> 
                                        </h6>
                                        <h6 className="card-subtitle mbr-fonts-style mb-3 display-4">
                                            <strong>Origen: {d.origin} </strong> 
                                        </h6>
                                        <h6 className="card-subtitle mbr-fonts-style mb-3 display-4">
                                            <strong>Características adicionales: {d.obs} </strong> 
                                        </h6>
                                    </div>
                                </div>
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
                                <h6 className=" card-title2 mbr-fonts-style m-0 mb-3 display-4">
                                    <strong>En este momento Usted no posee perros en adopción</strong> 
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
    
    return children;
}

function MisAdopciones(){
    let [showAdop, setShowAdop] = useState(false); 

    //muestra/oculta las adopciones
    const muestraAdop = () => {
        setShowAdop(!showAdop);         
    }

    //adopciones del cliente
    const MyAdop = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={muestraAdop}></span> 
            <div class="container">
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Perros que tengo en adopción</strong>
                    </h3>
                    {adopList()}
                </div>
            </div>
        </section>
    )

    //tarjeta de ver turnos
    const cardMyAdop = (
        <div className="card col-12 col-md-6 col-lg-3">
            <div className="card-wrapper">
                <div className="card-box align-center">
                    <div className="iconfont-wrapper">
                        <span className="mbr-iconfont mbrib-star" onClick={muestraAdop}></span>
                    </div>
                    <h5 className="card-title mbr-fonts-style display-7"><strong>Mis Adopciones</strong></h5>
                    <p className="card-text mbr-fonts-style display-7">Vea los perros que puso en adopción</p>
                </div>
            </div>
        </div>
    );

    return <>{showAdop ? MyAdop : cardMyAdop}</>
}

export default MisAdopciones;