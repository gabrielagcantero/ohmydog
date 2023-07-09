import React, { useState } from "react";

function PedirCampaña() {
    let [showForm, setShowForm] = useState(false); 

    const muestraForm = () => {setShowForm(!showForm)}; //muestra/oculta el formulario

    //muestra perros
    const pedirCampaña = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <div class="container">
                <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={muestraForm} ></span> 
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Solicitar campaña de donación</strong>
                    </h3>
                </div>
                <div className="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                    <div className="col-lg-12 mx-auto mbr-form">
                        <form onSubmit={/*consultar*/console.log("C")} className="mbr-form form-with-styler mx-auto">
                            <div>   
                                {/*contactData()*/}
                                <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <label for="why">Ingrese el motivo de la adopción:</label><br/>
                                    <textarea name="why" rows="5" class="form-control" required></textarea>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <input name="dog" type="hidden" value="{e.name}" />
                                    <input name="id_perroadop" type="hidden" value="{e.id_perroadop}" />
                                    <input name="owner" type="hidden" value="{e.owner}" />
                                </div>
                                <div className="col-auto mbr-section-btn align-center">
                                    <button type="submit" class="btn btn-info display-4"  style={{width: "50%", margin: "auto"}}>Enviar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
    
    //tarjeta de perros del cliente
    const cardCampaña = (
        <div className="card col-12 col-md-6 col-lg-3">
            <div className="card-wrapper">
                <div className="card-box align-center">
                    <div className="iconfont-wrapper">
                        <span className="mbr-iconfont mobi-mbri-cash mobi-mbri" onClick={muestraForm}></span>
                    </div>
                    <h5 className="card-title mbr-fonts-style display-7"><strong>Solicitar campaña</strong></h5>
                    <p className="card-text mbr-fonts-style display-7">Complete éste formulario para pedir una campaña de donación</p>
                </div>
            </div>
        </div>
    )
    
    return (showForm ? pedirCampaña : cardCampaña);
}

export default PedirCampaña;