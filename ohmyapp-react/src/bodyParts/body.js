import Services from './servicios/services';
import VeteServ from './veterinario/veteServ';

function Body(){
    return(
        <div>
            <section data-bs-version="5.1" className="features1 cid-tCttVg7EHo" id="features1-n">   
               <Services />
            </section>

            <section data-bs-version="5.1" className="features1 cid-tCttVg7EHo" id="features1-y">
                <VeteServ />
            </section>
        </div>
    )
}

export default Body;