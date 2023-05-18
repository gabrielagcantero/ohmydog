import React, { useState } from 'react';

//guarda en "myClient" los datos del cliente en formato Json. hay que pasarlos a la BD
//hay que hacer que mande el mail para la contraseña
function exportCli(event){
    const datos = new FormData(event.target); //toma los datos del formulario
    const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto
    let guardado = false;
    
    //controles
    if (new Date(datosCompletos.nac).getTime() > new Date().getTime()){ //controla la fecha
        alert("La fecha de nacimiento debe ser anterior a la fecha actual")
    } else {
        //ver si el mail ya está registrado
        //if (registrado)
            //alert("El mail que ingresó ya se encuentra registrado en el sistema")
        //else (si está todo bién)
            datosCompletos.veterinario = false; //agrego datos por defecto
            datosCompletos.perros = [];
            let myClient = JSON.stringify(datosCompletos) //lo paso a JSON
            alert("Los datos del nuevo cliente han sido guardados");
            guardado = true;
    }
    return guardado;
}

function CargaCli(){

    let [showCargaCli, setShowCargaCli] = useState(false); 

    const CargaCliente = () => {setShowCargaCli(!showCargaCli)}; //muestra/oculta el formulario
    const guardar = (event) => {
            event.preventDefault(); //para que no refresque por defecto
            if(exportCli(event))
                setShowCargaCli(!showCargaCli); //si se guardó oculta el formulario
        };


    // formulario para carga de cliente
    const formCargaCli = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={CargaCliente}></span> 
            <div class="container">
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Carga de nuevo cliente</strong>
                    </h3>
                </div>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                    <div class="col-lg-12 mx-auto mbr-form">
                        <form onSubmit={guardar} class="mbr-form form-with-styler mx-auto" data-form-title="Carga de cliente" id="cliForm">
                            <div class="dragArea row">
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <input type="text" pattern="[a-zA-Z ]{2,40}" name="name" placeholder="Nombre" class="form-control" required/>
                                    <input type="text" pattern="[a-zA-Z ]{2,20}" name="lastName" placeholder="Apellido" class="form-control" required />
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <label for="nac" >Fecha de nacimiento</label>
                                    <input type="date" name="nac" class="form-control" required />
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <input type="email" name="mail" placeholder="Email" class="form-control" required />
                                    <input type="text" pattern="[0-9]{8,13}" name="Tel" placeholder="Teléfono" class="form-control" required/>
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

    //tarjeta de Cargar cliente
    const cardCargaCli = ( 
    <div className="card col-12 col-md-6 col-lg-3">
        <div className="card-wrapper">
            <div className="card-box align-center">
                <div className="iconfont-wrapper">
                    <span className="mbr-iconfont mobi-mbri-users mobi-mbri" onClick={CargaCliente}></span>
                </div>
                <h5 className="card-title mbr-fonts-style display-7"><strong>Cargar cliente</strong></h5>
            
                <p className="card-text mbr-fonts-style display-7">Cargar los datos de un nuevo cliente para registrarlo en el sistema.</p>
            </div>
        </div>
    </div>
    );

    return(
        <>{showCargaCli ? formCargaCli : cardCargaCli}</>
    )
    
}

export default CargaCli;