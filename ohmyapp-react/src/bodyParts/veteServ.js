import Cards from './veterinario/cards';
import { VeteLog } from '../log.js';

function VeteServ(){
    if(VeteLog())
        return(
            <section data-bs-version="5.1" className="features1 cid-tCttVg7EHo" id="features1-y">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-9">
                            <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                                <strong>Sección para veterinarios</strong>
                            </h3>
                        </div>
                    </div>

                    <Cards />
                </div>
            </section>
        )
}

export default VeteServ;