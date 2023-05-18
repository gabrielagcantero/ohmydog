import Adopciones from './adopciones';
import Urgencias from './urgencias';

function Cards(){
    return(
        <div className="row">  
            <Adopciones />
            <Urgencias />
        </div>
    )
}

export default Cards;
