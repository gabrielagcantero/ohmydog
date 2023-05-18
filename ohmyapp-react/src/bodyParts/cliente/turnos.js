import React, { useState } from "react";

//guarda en "myTurn" los datos del turno en formato Json. hay que pasarlos a la BD
//hay que hacer que mande el mail para aceptar al vete
function exportTurn(event){
    const datos = new FormData(event.target); //toma los datos del formulario
    const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto
    let guardado = false;
    
    //controles
    if (new Date(datosCompletos.day).getTime() < new Date().getTime()){ //controla la fecha
        alert("La fecha del turno debe ser posterior a la fecha actual");
    } else {
        //ver si hay disponibilidad de turno en en día y franja solicitados
        //if (no está disponible)
            //alert("El horario solicitado se encuentra completo. Por favor elija otro")
        //else (si está todo bién)
            let myTurn = JSON.stringify(datosCompletos) //lo paso a JSON
            alert("El turno ha sido solicitado.");
            guardado = true;
    }
    return guardado;
}

function Turnos(){
    let [showTurnoForm, setShowTurnoForm] = useState(false); 

    const CargaTurno = () => {setShowTurnoForm(!showTurnoForm)}; //muestra/oculta el formulario
    const guardar = (event) => {
            event.preventDefault(); //para que no refresque por defecto
            if(exportTurn(event))
                setShowTurnoForm(!showTurnoForm); //si se guardó oculta el formulario
        };

    // formulario para solicitud de turno (hay que trer los perros del cliente de la BD)
    const formTurno = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={CargaTurno}></span> 
            <div class="container">
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Solicitud de turno</strong>
                    </h3>
                </div>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                    <div class="col-lg-12 mx-auto mbr-form">
                        <form onSubmit={guardar} class="mbr-form form-with-styler mx-auto" data-form-title="Carga de cliente" id="cliForm">
                            <div class="dragArea row">
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <select name="dog" class="form-control" required>
                                        <option value="" selected disabled>Seleccione el perro que desea atender</option>
                                        <option value="1">perro 1</option>
                                        <option value="2">perro 2</option>
                                        <option value="3">perro 3</option>
                                    </select>  
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <label for="day" >Seleccione el día</label>
                                    <input type="date" name="day" class="form-control" required />
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <select name="time" class="form-control" required>
                                        <option value="" selected disabled>Seleccione la franja horaria</option>
                                        <option value="1">mañana (8 a 13hs)</option>
                                        <option value="2">tarde (15 a 17.30hs)</option>
                                        <option value="3">noche (17.30 a 20hs)</option>
                                    </select> 
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <select name="motive" class="form-control" required>
                                        <option value="" selected disabled>Seleccione el motivo del turno</option>
                                        <option value="1">Consulta</option>
                                        <option value="2">Vacuna tipo A (prevención)</option>
                                        <option value="3">Vacuna tipo B (antirrábica)</option>
                                        <option value="4">Desparasitación</option>
                                        <option value="5">Castración</option>
                                    </select> 
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

    //tarjeta de solicitud de turno
    const cardTurno = (
        <div className="card col-12 col-md-6 col-lg-3">
            <div className="card-wrapper">
                <div className="card-box align-center">
                    <div className="iconfont-wrapper">
                        <span className="mbr-iconfont mobi-mbri-calendar mobi-mbri" onClick={CargaTurno}></span>
                    </div>
                    <h5 className="card-title mbr-fonts-style display-7"><strong>Solicitar turno</strong></h5>
                    <p className="card-text mbr-fonts-style display-7">Solicite turnos para sus perros desde la comodidad de su hogar.</p>
                </div>
            </div>
        </div>
    );

    return <>{showTurnoForm ? formTurno : cardTurno}</>
}

export default Turnos;
