import Services from './servicios/services';
import VeteServ from './veteServ';

function Body({log, veter}){
    return(
        <div>
            <Services />
            <VeteServ log={log} veter={veter} />
        </div>
    )
}

export default Body;