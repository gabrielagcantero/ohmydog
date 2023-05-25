import Services from './servicios/services';
import VeteServ from './veteServ';
import ClientServ from './clientServ';

function Body({log, veter}){
    return(
        <div>
            <Services />
            <VeteServ log={log} veter={veter} />
            <ClientServ log={log} veter={veter} />
        </div>
    )
}

export default Body; 