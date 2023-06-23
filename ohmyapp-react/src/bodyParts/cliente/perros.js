import React, { useState } from "react";
import Libreta from "../servicios/libreta";

//trae los perros del cliente y los devuelve en un array
function getDogs(){
    const dogs = [];

    fetch('http://localhost:3000/get-ownerdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => dogs.push(e))});
    
    return dogs;
}

let dogs = getDogs();

function Perros(){
    let[showDogs, setShowDogs] = useState(false);
    let[showDogData, setShowDogData] = useState(null);
    let[showLibreta, setShowLibreta] = useState(null);

    //muestra/oculta los perros
    const muestraDogs = () => {
        setShowDogs(!showDogs);         
    }

    //muestra datos de un perro
    const myDog = (id, showLibreta, setShowLibreta) => {
        let d = dogs.find((e) => (e.id) === id);
        const mostrarLibreta = (event) => {showLibreta? setShowLibreta(null) : setShowLibreta(event.target.value)};

        const myImage = (src) => (
            <div><img src={src} alt="foto del perro" style={{height: "300px", width:"auto"}} /></div>
        )



        return (
            <div>
                <h6 className="card-title mbr-fonts-style mb-3 display-7">
                    <strong>Nombre: {d.name} </strong> 
                </h6>
                <h6 className="card-title mbr-fonts-style mb-3 display-7">
                    <strong>Fecha de nacimiento: {d.nac.substring(0,10)} </strong> 
                </h6>
                <h6 className="card-title mbr-fonts-style mb-3 display-7">
                    <strong>Raza: {d.breed} </strong> 
                </h6>
                <h6 className="card-title mbr-fonts-style mb-3 display-7">
                    <strong>Sexo: {d.sex === "m"? "macho" : "hembra"} </strong> 
                </h6>
                <h6 className="card-title mbr-fonts-style mb-3 display-7">
                    <strong>Observaciones: {d.obs? d.obs : "-"} </strong> 
                </h6>
                <h6 className="card-title mbr-fonts-style mb-3 display-7">
                    <strong>Foto: {d.image? myImage(d.image) : "el perro no posee foto"} </strong> 
                </h6>
                <button value={id} className="btn btn-success" onClick={mostrarLibreta}>Ver libreta de {d.name}</button>
                {(String(id) === showLibreta) && <Libreta dog={id}/>}
                <br/>
            </div>
        )
    }

    //arma la lista de perros
    const dogList = (showDogData, setShowDogData, showLibreta, setShowLibreta) => {
        let children;

        //muestra/oculta los datos de un perro
        const muestraPerro = (event) => {showDogData? setShowDogData(null) : setShowDogData(event.target.value)};

        //si hay perros devuelve la lista
        if (dogs.filter((p) => p.owner === JSON.parse(localStorage.getItem("user")).mail).length > 0){ 
            children = dogs.filter((p) => p.owner === JSON.parse(localStorage.getItem("user")).mail).map((e) => {
                return( 
                    <div className="col-10" style={{marginLeft: "30px"}}>
                        <h6 className=" card-title2 mbr-fonts-style m-0 mb-3 display-4">
                            <button value={e.id} className="btn btn-success" onClick={muestraPerro}>Ver Perro</button>
                            <strong>{e.name}</strong> 
                        </h6>
                        {String(e.id) ===  showDogData && (myDog(e.id, showLibreta, setShowLibreta))}
                    </div>
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
                                        {dogList(showDogData, setShowDogData, showLibreta, setShowLibreta)}
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
                        <span className="mbr-iconfont mbrib-home" onClick={muestraDogs}></span>
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