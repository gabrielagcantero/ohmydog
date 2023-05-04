import Place from './place';
import Tel from './tel';
import Mail from './mail';


function LeftCol(){
    return (
        <div className="card col-12 col-md-4">
            <Place />
            <Tel />
            <Mail />
        </div>
    )
}

export default LeftCol;