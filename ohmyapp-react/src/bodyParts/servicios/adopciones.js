import React, { useState } from "react";

//trae los perros en adopción y los devuelve en un array (conectar con BD)
function getDogs(){
    const dogs = [];

    fetch('http://localhost:3000/get-adopdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => dogs.push(e))});
    
    return dogs;
}

let dogs = getDogs();

function Adopciones(){
    let[showDogs, setShowDogs] = useState(false);

    //muestra/oculta los perros
    const muestraDogs = () => {
        setShowDogs(!showDogs);         
    }

    //arma la lista de perros
    const dogList = () => {
        let children;

        //si hay perros devuelve la lista
        if (dogs.length > 0){ 
            children = dogs.map((e) => {
                return( 
                    <div className="col-10">
                        <h6 className=" card-title2 mbr-fonts-style m-0 mb-3 display-4">
                            <strong>{e.name}</strong> 
                        </h6>
                        <div>
                            <h6 className="card-title mbr-fonts-style mb-3 display-7">
                                <strong>Edad aproximada: {e.age} </strong> 
                            </h6>
                            <h6 className="card-title mbr-fonts-style mb-3 display-7">
                                <strong>Raza: {e.breed} </strong> 
                            </h6>
                            <h6 className="card-title mbr-fonts-style mb-3 display-7">
                                <strong>Color: {e.color} </strong> 
                            </h6>
                            <h6 className="card-title mbr-fonts-style mb-3 display-7">
                                <strong>Origen: {e.origin} </strong> 
                            </h6>
                            <h6 className="card-title mbr-fonts-style mb-3 display-7">
                                <strong>Sexo: {e.sex === "m"? "macho" : "hembra"} </strong> 
                            </h6>
                            <h6 className="card-title mbr-fonts-style mb-3 display-7">
                                <strong>Características adicionales: {e.obs? e.obs : "-"} </strong> 
                            </h6>
                            <button>Adoptar</button>
                            <br/>
                        </div>
                    </div>
                )})}
        //si no hay perros devuelve mensaje
        else{ 
            children = (
                <h6 className="card-title2 mbr-fonts-style m-0 mb-3 display-4">
                    <strong>En este momento no hay perros para adoptar</strong> 
                </h6>
        )}
        
        return children;
    }

    //muestra perros del cliente
    const DogsAdop = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <div class="container">
                <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={muestraDogs}></span> 
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Perros en adopción</strong>
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
    const cardDogsAdop = (
        <div className="card col-12 col-md-6 col-lg-3">
            <div className="card-wrapper">
                <div className="card-box align-center">
                    <div className="iconfont-wrapper">
                        <span className="mbr-iconfont mobi-mbri-hearth mobi-mbri" onClick={muestraDogs}></span>
                    </div>
                    <h5 className="card-title mbr-fonts-style display-7"><strong>Adopciones</strong></h5>
                    <p className="card-text mbr-fonts-style display-7">Ofrézcale hogar a un perrito que lo necesita.</p>
                </div>
            </div>
        </div>
    )
    
    return (showDogs? DogsAdop : cardDogsAdop)
}

export default Adopciones;