import Map from './map';
import LeftCol from './leftCol';

function Footer(){
    return(
        <section data-bs-version="5.1" className="contacts3 map1 cid-tCtRQwSafd" id="contacts3-x">
            <div className="container">
                <div className="mbr-section-head">
                    <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2 contact">
                        <strong>Contacto</strong>
                    </h3>
                </div>

                <div className="row justify-content-center mt-4">
                    <LeftCol />
                    <Map />
                </div>
            </div>
        </section>
    )
}

export default Footer;