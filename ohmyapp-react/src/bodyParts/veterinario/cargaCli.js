import { useState } from 'react';

function confirCli(){
    alert("Los datos del nuevo cliente han sido guardados")
}

function CargaCli(){
    
    let [showCargaCli, setShowCargaCli] = useState(false);
    
    const CargaCliente = () => { setShowCargaCli(!showCargaCli)};
    const guardar = () => {confirCli()};
    
    if (showCargaCli)
        return(
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
                            <form class="mbr-form form-with-styler mx-auto" data-form-title="Carga de cliente">
                                <div class="dragArea row">
                                    <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                        <input type="text" name="name" placeholder="Nombre" class="form-control" />
                                        <input type="text" name="lastName" placeholder="Apellido" class="form-control" />
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                        <label for="nac" >Fecha de nacimiento</label>
                                        <input type="date" name="nac" class="form-control" />
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                        <input type="email" name="mail" placeholder="Email" class="form-control" />
                                        <input type="text" name="Tel" placeholder="Teléfono" class="form-control" />
                                    </div>

                                    <div class="col-auto mbr-section-btn align-center">
                                        <button type="submit" class="btn btn-info display-4" onClick={guardar} style={{width: "50%", margin: "auto"}}>Guardar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        )
    else
        return(
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
        )
}

export default CargaCli;