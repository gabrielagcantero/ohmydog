import React, { useState } from "react";

function ModifTurnos(props){

    if (props.switch){
        return (
            <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
                <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick=""></span> 
                <div class="container">
                    <div class="mbr-section-head">
                        <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                            <strong>Solicitud de turno</strong>
                        </h3>
                    </div>
                    <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                        <div class="col-lg-12 mx-auto mbr-form">
                            <form onSubmit="" class="mbr-form form-with-styler mx-auto" data-form-title="Carga de cliente" id="cliForm">
                                <div class="dragArea row">
                                    <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                        <select name="dog" class="form-control" required>
                                            <option value="" selected disabled>Seleccione el perro que desea atender</option>
                                        </select>  
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                        <label for="day" >Seleccione el día</label>
                                        <input type="date" name="day" class="form-control" required />
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                        <select name="time" class="form-control" required>
                                            <option value="" selected disabled>Seleccione la franja horaria</option>
                                            <option value="mañana">mañana (8 a 13hs)</option>
                                            <option value="tarde">tarde (15 a 17.30hs)</option>
                                            <option value="noche">noche (17.30 a 20hs)</option>
                                        </select> 
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                        <select name="motive" class="form-control" required>
                                            <option value="" selected disabled>Seleccione el motivo del turno</option>
                                            <option value="Consulta">Consulta</option>
                                            <option value="Vacuna tipo A">Vacuna tipo A (prevención)</option>
                                            <option value="Vacuna tipo B">Vacuna tipo B (antirrábica)</option>
                                            <option value="Desparasitación">Desparasitación</option>
                                            <option value="Castración">Castración</option>
                                        </select> 
                                    </div>
        
                                    <div class="col-auto mbr-section-btn align-center">
                                        <button type="submit" class="btn btn-info display-4"  style={{width: "50%", margin: "auto"}}>Solicitar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>)
    } 
}
export default ModifTurnos;