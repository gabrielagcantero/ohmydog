import Log from '../log';

function LoginBtns(){
    if (Log())
        return(
            <div className="navbar-buttons mbr-section-btn">
                <a className="btn btn-info display-4" href="index.html">Salir</a>
            </div>
        )
    else
        return (
            <div className="navbar-buttons mbr-section-btn">
                <a className="btn btn-info display-4" href="login.html">Ingresar</a>
            </div>
        )
}

export default LoginBtns;