import React from 'react';
import Turnos from './cliente/turnos';
import MisTurnos from './cliente/misTurnos';
import Perros from './cliente/perros';
import CargaAdop from './servicios/cargaAdop';

function ClientServ({log, veter}){

    //seccion para veterinarios
    const clientSec = (
        <section data-bs-version="5.1" className="features1 cid-tCttVg7EHo" id="clientSec">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-9">
                        <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                            <strong>Sección para Clientes</strong>
                        </h3>
                    </div>
                </div>
                    <div className="row">
                        <Perros/>
                        <Turnos />
                        <MisTurnos />
                        <CargaAdop />
                    </div>
            </div>
        </section>
    )

    return (((log && !veter) || (localStorage.getItem("logged") === "true" && localStorage.getItem("veter") === "false")) && clientSec);
}

export default ClientServ;