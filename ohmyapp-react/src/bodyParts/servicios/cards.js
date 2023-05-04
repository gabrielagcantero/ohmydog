import Adopciones from './adopciones';
import Turnos from './turnos';
import Urgencias from './urgencias';

function Cards(){
    return(
        <div className="row">  
            <Adopciones />
            <Turnos />
            <Urgencias />
        </div>
    )
}

export default Cards;
