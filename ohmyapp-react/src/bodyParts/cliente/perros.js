import React, { useState } from "react";

//trae los perros del cliente y los devuelve en un array
function getDogs(){
    const dogs = [];

    fetch('http://localhost:3000/get-ownerdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => dogs.push(e))});
    
    return dogs;
}

let dogs = getDogs();

const dogList = () => {
    let children;
    //si hay perros devuelve la lista
    if (dogs.filter((p) => p.owner === JSON.parse(localStorage.getItem("user")).mail).length > 0){ 
        children = dogs.filter((p) => p.owner === JSON.parse(localStorage.getItem("user")).mail).map((e) => {
            return( 
                <h6 className=" card-title2 mbr-fonts-style m-0 mb-3 display-4">
                    <button value={e.id} className="btn btn-success">Ver Perro</button>
                    <strong>{e.name}</strong> 
                </h6>
            )})}
    //si no hay perros devuelve mensaje
    else{ 
        children = (
            <h6 className="card-title2 mbr-fonts-style m-0 mb-3 display-4">
                <strong>En este momento Usted no posee perros registrados en el sistema</strong> 
            </h6>
    )}
    
    return children;
}

function Perros(){
    let[showDogs, setShowDogs] = useState(false);

    //muestra/oculta los perros
    const muestraDogs = () => {
        setShowDogs(!showDogs);         
    }

    //muestra perros del cliente
    const myDogs = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <div class="container">
                <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={muestraDogs}></span> 
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Mis Perros</strong>
                    </h3>
                    <div className="container">
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="row align-items-center">
                                    <div className="col-10 col-md">
                                        {dogList()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
    
    //tarjeta de perros del cliente
    const cardDogs = (
        <div className="card col-12 col-md-6 col-lg-3">
            <div className="card-wrapper">
                <div className="card-box align-center">
                    <div className="iconfont-wrapper">
                        <span className="mbr-iconfont mobi-mbri-hearth mobi-mbri" onClick={muestraDogs}></span>
                    </div>
                    <h5 className="card-title mbr-fonts-style display-7"><strong>Mis Perros</strong></h5>
                    <p className="card-text mbr-fonts-style display-7">Vea qué perros tiene registrados.</p>
                </div>
            </div>
        </div>
    )
    
    return (showDogs? myDogs : cardDogs)
}

export default Perros;