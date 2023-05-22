import React, { useState } from 'react';

//trae los mails de los clientes y los devuelve en un array
function getMails(){
    const mails= [];

    fetch('http://localhost:3000/get-clientdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => mails.push(e.mail));
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

let dogs = getDogs();
let mails = getMails();


//guarda en "myDog" los datos del perro en formato Json y los manda a la BD
function exportDog(event){
    const datos = new FormData(event.target); //toma los datos del formulario
    const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto
    let guardado = false;
   
    //controles
    if (new Date(datosCompletos.nac).getTime() > new Date().getTime()){ //controla la fecha
        alert("La fecha de nacimiento debe ser anterior a la fecha actual")
    } else {
        //trae los perros del mismo dueño para ver que no se repita el nombre
        if (dogs.filter((e) => e.owner === datosCompletos.owner).map((p) => p.name).includes(datosCompletos.name))
            alert("El cliente ya posee un perro con ese nombre")
        else {
            let myDog = JSON.stringify(datosCompletos); //lo paso a JSON

            //lo lleva a la BD
            fetch('http://localhost:3000/store-dogdata', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: myDog})
                .then(function(response) {return response.json();});

            alert("Los datos del nuevo perro han sido guardados");
            dogs = getDogs();
            window.location.href = window.location.href;
        }
    }
    return guardado;
}

//crea las opciones del select con los mails de los clientes
function options() {
    const children = mails.map((m) => (
        React.createElement("option", {value: m}, m)))
    return children;
}

function CargaDog(){

    let [showCargaDog, setShowCargaDog] = useState(false); 

    const CargaPerro = () => {
        setShowCargaDog(!showCargaDog)}; //muestra/oculta el formulario

    const guardar = (event) => {
            event.preventDefault(); //para que no refresque por defecto
            exportDog(event);  
        };

    // formulario para carga de perro (hay que trer los id de cliente de la BD)
    const formCargaDog = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo">
            <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={CargaPerro}></span> 
            <div class="container">
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Carga de nuevo perro</strong>
                    </h3>
                </div>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                    <div class="col-lg-12 mx-auto mbr-form">
                        <form onSubmit={guardar} class="mbr-form form-with-styler mx-auto" data-form-title="Carga de cliente" id="cliForm">
                            <div class="dragArea row">
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <select id="select-new-dog" name="owner" class="form-control" required>
                                        <option  value="" selected disabled>Seleccione cliente</option>
                                        {options()}
                                    </select>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <input type="text" name="name" placeholder="Nombre" class="form-control" required/>
                                    <input type="text" pattern="[a-zA-Z ]{2,20}" name="breed" placeholder="Raza" class="form-control" required /> <br/>
                                    <label for="sex">Sexo:</label><br/>
                                    <input type="radio" id="fem" name="sex" value="f" required />
                                    <label for="fem">Femenino</label><br/>
                                    <input type="radio" id="masc" name="sex" value="m" required />
                                    <label for="masc">Masculino</label><br/>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <label for="nac" >Fecha de nacimiento</label>
                                    <input type="date" name="nac" class="form-control" required />
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <label for="obs">Observaciones:</label><br/>
                                    <textarea id="obs" name="obs" rows="5" class="form-control"></textarea>
                                </div>

                                <div class="col-auto mbr-section-btn align-center">
                                    <button type="submit" class="btn btn-info display-4"  style={{width: "50%", margin: "auto"}}>Guardar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );

    //tarjeta de Cargar perro
    const cardCargaDog = (
        <div className="card col-12 col-md-6 col-lg-3">
            <div className="card-wrapper">
                <div className="card-box align-center">
                    <div className="iconfont-wrapper">
                        <span className="mbr-iconfont mbrib-edit" onClick={CargaPerro}></span>
                    </div>
                    <h5 className="card-title mbr-fonts-style display-7"><strong>Cargar perro</strong></h5>
                    <p className="card-text mbr-fonts-style display-7">Cargar los datos de un nuevo perro y asociarlo a un cliente.</p>
                </div>
            </div>
        </div>
    )

    return (
        <>{showCargaDog ? formCargaDog : cardCargaDog}</>
    )
}

export default CargaDog;