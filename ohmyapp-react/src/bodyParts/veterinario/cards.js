import CargaCli from './cargaCli';
import CargaDog from './cargaDog';
import Turnos from './verTurn';

function Cards(){
    return(
        <div className="row">
            <CargaCli />
            <CargaDog />
            <Turnos />
        </div>
    )
}

export default Cards;