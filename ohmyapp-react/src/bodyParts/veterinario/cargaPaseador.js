import React, { useState } from 'react';

//trae los mails de los paseadores y los devuelve en un array
function getMails(){
    const mails= [];

    fetch('http://localhost:3000/get-paseadores')
        .then((response) => response.json())
        .then((results) => {results.map((e) => mails.push(e.email));
        });

    return mails;
}

let mails = getMails();

//guarda en "myPaseador" los datos del paseador en formato Json y los pasa a la BD
function exportPas(event){
    event.preventDefault(); //para que no refresque por defecto
    const datos = new FormData(event.target); //toma los datos del formulario
    const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto
    
    //controles
    //si no se pueso precio
    if (!datosCompletos.precio){
        alert("Debe ingresar el precio del servicio");
    } else {
        //ver si el mail ya está registrado
        if (mails.includes(datosCompletos.email))
            alert("El mail que ingresó ya se encuentra registrado en el sistema de paseadores")
        else {//si está todo bien
            let myPaseador = JSON.stringify(datosCompletos)
            window.confirm("Los datos serán agregados a la lista de paseadores. Desea continuar?") && send(myPaseador);
        }
    }
}

function send(myPaseador){
    //lo lleva a la BD
    fetch('http://localhost:3000/store-paseador', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: myPaseador
    }).then(function(response) {
        return response.json();
    });

    alert("Los datos del nuevo paseador han sido guardados");
    window.location.href = window.location.href;
}

function CargaPaseador(){

    let [showCargaPas, setShowCargaPas] = useState(false); 

    const CargaPas = () => {setShowCargaPas(!showCargaPas)}; //muestra/oculta el formulario

    // formulario para carga de paseador
    const formCargaPaseador = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={CargaPas}></span> 
            <div class="container">
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Carga de nuevo paseador</strong>
                    </h3>
                </div>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                    <div class="col-lg-12 mx-auto mbr-form">
                        <form onSubmit={exportPas} class="mbr-form form-with-styler mx-auto" data-form-title="Carga de cliente" id="cliForm">
                            <div class="dragArea row">
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <input type="text" pattern="[a-zA-Z ]{2,40}" name="frist_name" placeholder="Nombre" className="form-control" required/>
                                    <input type="text" pattern="[a-zA-Z ]{2,20}" name="last_name" placeholder="Apellido" class="form-control" required />
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                <select name="zona" required>
                                    <option value="" selected disabled>Seleccione la zona:</option>
                                    <option value="Bosque">Bosque</option>
                                    <option value="Parque Alberti">Parque Alberti</option>
                                    <option value="Parque Castelli">Parque Castelli</option>
                                    <option value="Parque Saavedra">Parque Saavedra</option>
                                    <option value="Parque Vucetich">Parque Vucetich</option>
                                    <option value="Plaza Alsina">Plaza Alsina</option>
                                    <option value="Plaza Azcuénaga">Plaza Azcuénaga</option>
                                    <option value="Plaza Belgrano">Plaza Belgrano</option>
                                    <option value="Plaza Dardo Rocha">Plaza Dardo Rocha</option>
                                    <option value="Plaza Hipólito Yrigoyen">Plaza Hipólito Yrigoyen</option>
                                    <option value="Plaza Italia">Plaza Italia</option>
                                    <option value="Plaza Matheu">Plaza Matheu</option>
                                    <option value="Plaza Moreno">Plaza Moreno</option>
                                    <option value="Plaza San Martín">Plaza San Martín</option> 
                                </select>
                                </div>
                                <div class="form-inline" >
                                    <label for="precio" style={{paddingTop:"5px"}}>Costo del servicio: $</label>
                                    <input name="precio" style={{width:"20%", marginLeft:"5px", marginRight:"5px"}}  type="number" step="0.01" min="0.00"/>
                                    <label style={{paddingTop:"5px"}}>/hora</label>  
                                </div>
                                <p></p>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <input type="email" name="email" placeholder="Email" class="form-control" required />
                                    <input type="text" pattern="[0-9]{8,13}" name="telefono" placeholder="Teléfono" class="form-control" required/>
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

    //tarjeta de Cargar paseador
    const cardCargaPaseador = ( 
    <div className="card col-12 col-md-6 col-lg-3">
        <div className="card-wrapper">
            <div className="card-box align-center">
                <div className="iconfont-wrapper">
                    <span className="mbr-iconfont mbrib-sun" onClick={CargaPas}></span>
                </div>
                <h5 className="card-title mbr-fonts-style display-7"><strong>Cargar paseador</strong></h5>
            
                <p className="card-text mbr-fonts-style display-7">Cargar los datos de un nuevo paseador.</p>
            </div>
        </div>
    </div>
    );

    return(
        <>{showCargaPas ? formCargaPaseador : cardCargaPaseador}</>
    )
    
}

export default CargaPaseador;