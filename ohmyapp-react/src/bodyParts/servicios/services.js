import Adopciones from "./adopciones";
import Paseadores from "./paseadores";

function Services(){
    return(
        <section data-bs-version="5.1" className="features1 cid-tCttVg7EHo" >
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-9">
                        <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                            <strong>Servicios</strong>
                        </h3>
                    </div>
                </div>
                <div className="row">  
                    <Adopciones />
                    <Paseadores />
                </div>
            </div>
        </section>
    )
}

export default Services;
