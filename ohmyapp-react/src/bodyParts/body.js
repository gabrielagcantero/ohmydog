import Services from './servicios/services';
import VeteServ from './veteServ';
import ClientServ from './clientServ';
import Perfil from './cliente/perfil';

function Body({showPerfil, log, veter, handleShowPerfil}){
    return(
        <div>
            <Perfil showPerfil={showPerfil} handleShowPerfil={handleShowPerfil} />
            <Services />
            <VeteServ log={log} veter={veter} />
            <ClientServ log={log} veter={veter} />
        </div>
    )
}

export default Body; 