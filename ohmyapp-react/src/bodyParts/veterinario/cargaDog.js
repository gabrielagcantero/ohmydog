import React, { useState } from 'react';

//guarda en "myDog" los datos del perro en formato Json. hay que pasarlos a la BD
//necesito traer perros de la BD para ver si se repiten
function exportDog(event){
    const datos = new FormData(event.target); //toma los datos del formulario
    const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto
    let guardado = false;
   
    //controles
    if (new Date(datosCompletos.nac).getTime() > new Date().getTime()){ //controla la fecha
        alert("La fecha de nacimiento debe ser anterior a la fecha actual")
    } else {
        //if (el nombre del perro está repetido)
            //alert("El cliente ya posee un perro con ese nombre")
        // else agrego datos por defecto
            datosCompletos.cruza = true;
            datosCompletos.libreta = {
                vacunas: [],
                antiparasitario: [],
                castrado: false
            }
            let myDog = JSON.stringify(datosCompletos); //lo paso a JSON

            alert("Los datos del nuevo perro han sido guardados");
            guardado = true;
    }
    return guardado;
}

function CargaDog(){

    let [showCargaDog, setShowCargaDog] = useState(false); 

    const CargaPerro = () => {setShowCargaDog(!showCargaDog)}; //muestra/oculta el formulario
    const guardar = (event) => {
            event.preventDefault(); //para que no refresque por defecto
            if(exportDog(event))
                setShowCargaDog(!showCargaDog); //si se guardó oculta el formulario
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
                                    <select name="client" class="form-control" required>
                                        <option value="" selected disabled>Seleccione cliente</option>
                                        <option value="client1">naty999@gmail.com</option>
                                        <option value="client2">cliente 2</option>
                                        <option value="client3">cliente 3</option>
                                    </select>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <input type="text" name="name" placeholder="Nombre" class="form-control" required/>
                                    <input type="text" pattern="[a-zA-Z ]{2,20}" name="raza" placeholder="Raza" class="form-control" required /> <br/>
                                    <label for="sex">Sexo:</label><br/>
                                    <input type="radio" id="fem" name="sex" value="femenino" required />
                                    <label for="fem">Femenino</label><br/>
                                    <input type="radio" id="masc" name="sex" value="masculino" required />
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