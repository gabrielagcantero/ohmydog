import React, { useState } from "react";


/*
    agarra los datos del formulario de campaña y los controla
*/
function controlCampaña(event){
    const datos = new FormData(event.target); //toma los datos del formulario
    const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto

    if (!datosCompletos.monto) datosCompletos.monto = null; //si no se ingresa monto, se pone 0
    
    //Controles
    //control Fecha -> si la fecha de finalizacion ingresada es previa a la actual
    if (new Date(datosCompletos.date_cierre).getTime() < new Date().getTime()){ 
        alert("La fecha de finalizacion de campaña debe ser posterior a la fecha actual")
    }else{
        window.confirm("Se creará una nueva campaña de donación con los datos proporcionados. ¿Desea continuar?") && exportCampaña(datosCompletos);
    }
}

//manda los datos a la bd
function exportCampaña(datosCompletos){

        let myCampaña = JSON.stringify(datosCompletos); //lo paso a JSON

        //lo lleva a la BD
        fetch('http://localhost:3000/store-campana', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: myCampaña})
            .then(function(response) {return response.json();});
    
    alert("La campaña se creo correctamente");
    window.location.href = window.location.href;
}

function CargaCampaña() {
    let [showCargaCamp, setShowCargaCamp] = useState(false); 

    const CargaCampaña = () => {setShowCargaCamp(!showCargaCamp)}; //muestra/oculta el formulario

    const guardar = (event) => {
            event.preventDefault(); //para que no refresque por defecto
            controlCampaña(event);
        };

    // formulario para carga de cliente
    const formCargaCamp = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={CargaCampaña}></span> 
            <div class="container">
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Carga de nueva campaña de donación</strong>
                    </h3>
                </div>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                    <div class="col-lg-12 mx-auto mbr-form">
                        <form onSubmit={guardar} class="mbr-form form-with-styler mx-auto" data-form-title="Carga de cliente" id="cliForm">
                            <div class="dragArea row">
                                <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <input type="text" name="nombre" placeholder="Nombre de la campaña" class="form-control" required/>
                                </div>
                                <div class="form-inline" >
                                    <label for="monto" style={{paddingTop:"5px"}}>Monto a recaudar: $</label>
                                    <input name="monto" style={{width:"20%", marginLeft:"5px", marginRight:"5px"}} type="number" step="0.01" min="0.00"/>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <label for="desc">Descripción:</label><br/>
                                    <textarea name="desc" rows="5" class="form-control" required></textarea>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <label for="date_cierre">Fecha de cierre:</label><br/>
                                    <input type="date" name="date_cierre" class="form-control" required />
                                </div>
                                <div className="col-auto mbr-section-btn align-center">
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
    const cardCargaCamp = ( 
    <div className="card col-12 col-md-6 col-lg-3">
        <div className="card-wrapper">
            <div className="card-box align-center">
                <div className="iconfont-wrapper">
                    <span className="mbr-iconfont mobi-mbri-cash mobi-mbri" onClick={CargaCampaña}></span>
                </div>
                <h5 className="card-title mbr-fonts-style display-7"><strong>Cargar campaña</strong></h5>
            
                <p className="card-text mbr-fonts-style display-7">Cargar los datos de una nueva campaña de donación.</p>
            </div>
        </div>
    </div>
    );

    return(
        <>{showCargaCamp ? formCargaCamp : cardCargaCamp}</>
    )
}

export default CargaCampaña;

