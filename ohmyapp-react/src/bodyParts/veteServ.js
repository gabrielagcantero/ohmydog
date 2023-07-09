import CargaCli from './veterinario/cargaCli';
import CargaDog from './veterinario/cargaDog';
import Turnos from './veterinario/verTurn';
import Aceptar from './veterinario/aceptar';
import Clients from './veterinario/clients';
import CargaAdop from './servicios/cargaAdop';
import MisAdopciones from './servicios/misAdopciones';
import CargaPaseador from './veterinario/cargaPaseador';
import CargaCampaña from './veterinario/cargaCampaña';

function VeteServ({log, veter}){

    //seccion para veterinarios
    const veteSec = (
        <section data-bs-version="5.1" className="features1 cid-tCttVg7EHo" id="veteSec">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-9">
                        <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                            <strong>Sección para veterinarios</strong>
                        </h3>
                    </div>
                </div>
                    <div className="row">
                        <CargaCli />
                        <CargaDog />
                        <CargaPaseador />
                        <CargaCampaña />
                        <Clients/>
                        <Turnos />
                        <Aceptar />
                        <CargaAdop />
                        <MisAdopciones />
                    </div>
            </div>
        </section>
    )

    return (((log && veter) || (localStorage.getItem("logged") === "true" && localStorage.getItem("veter") === "true")) && veteSec);
}

export default VeteServ;