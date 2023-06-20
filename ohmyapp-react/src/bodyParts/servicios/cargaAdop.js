import React, { useState } from "react";
import SelectRazas from "./selectRazas";
import SelectColor from "./selectColor";

//guarda en "myDog" los datos del perro en formato Json y los manda a la BD (hay que hacer la conexión)
function exportDog(event){
    const datos = new FormData(event.target); //toma los datos del formulario
    const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto
    
    if (datosCompletos.color === "personalizada") //si eligió escribirlo
        datosCompletos.color = datosCompletos.otroColor;
    if (datosCompletos.breed === "personalizada") 
        datosCompletos.breed = datosCompletos.otraRaza;
    datosCompletos.owner = JSON.parse(localStorage.getItem("user")).mail; //agrego quién publica

    let myDog = JSON.stringify(datosCompletos); //lo paso a JSON

    //lo lleva a la BD
    fetch('http://localhost:3000/store-dogAdop', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: myDog})
        .then(function(response) {return response.json();});

    alert("El perro ha sido puesto en adopción");
    window.location.href = window.location.href;
}

function CargaAdop(){

    let [showCargaAdop, setShowCargaAdop] = useState(false); 

    //muestra/oculta el formulario
    const CargaPerro = () => {setShowCargaAdop(!showCargaAdop)}; 

    const guardar = (event) => {
            event.preventDefault(); //para que no refresque por defecto
            exportDog(event);  
        };

    // formulario para carga de perro (hay que trer los id de cliente de la BD)
    const formCargaAdop = (
        <section data-bs-version="5.1" className="form7 cid-tCtCU4eUuo">
            <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={CargaPerro}></span> 
            <div className="container">
                <div className="mbr-section-head">
                    <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Carga de perro para adopción</strong>
                    </h3>
                </div>
                <div className="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                    <div className="col-lg-12 mx-auto mbr-form">
                        <form onSubmit={guardar}  class="mbr-form form-with-styler mx-auto" >
                            <div class="dragArea row">
                                <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <input type="text" minlength="2" name="name" placeholder="Nombre (dejar en blanco en caso de que el perro no tenga nombre)" class="form-control"/>
                                    <input type="text" name="age" placeholder="Edad estimada" class="form-control" required />
                                </div>
                                <div>
                                    {<SelectRazas />}
                                    {<SelectColor />}
                                    <input type="text" pattern="[a-zA-Z ]{2,20}" name="origin" placeholder="Origen" class="form-control" required /><br/>
                                    <label for="sex">Sexo:</label><br/>
                                    <input type="radio" id="fem" name="sex" value="f" required />
                                    <label for="fem">Femenino</label><br/>
                                    <input type="radio" id="masc" name="sex" value="m" required />
                                    <label for="masc">Masculino</label><br/><br/>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <label for="obs">Características adicionales:</label><br/>
                                    <textarea id="obs" name="obs" rows="5" class="form-control"></textarea>
                                    <input name="owner" type="hidden" value={localStorage.getItem("user").mail} />
                                </div>

                                <div className="col-auto mbr-section-btn align-center">
                                    <button type="submit" className="btn btn-info display-4"  style={{width: "50%", margin: "auto"}}>Guardar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );

    //tarjeta de Cargar perro
    const cardCargaAdop = (
        <div className="card col-12 col-md-6 col-lg-3">
            <div className="card-wrapper">
                <div className="card-box align-center">
                    <div className="iconfont-wrapper">
                        <span className="mbr-iconfont mobi-mbri-hearth mobi-mbri" onClick={CargaPerro}></span>
                    </div>
                    <h5 className="card-title mbr-fonts-style display-7"><strong>Poner en adopción</strong></h5>
                    <p className="card-text mbr-fonts-style display-7">Cargue los datos de un perro y póngalo en adopción.</p>
                </div>
            </div>
        </div>
    )

    return (
        <>{showCargaAdop? formCargaAdop : cardCargaAdop}</>
    )
}

export default CargaAdop;