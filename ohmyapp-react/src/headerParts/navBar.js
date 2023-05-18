
import  { LoginBtns } from '../LoginBtns';

function NavBar({ log, veter, handleLog, handleShowForm }){
    const veteLink = (
        <li className="nav-item">
            <a className="nav-link link text-info text-primary display-4" href="index.html#veteSec">Veterinarios</a>
        </li>
    )

    const clientLink = (
        <li className="nav-item">
            <a className="nav-link link text-info text-primary display-4" href="index.html#clientSec">Clientes</a>
        </li>
    )


    return(
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
                <li className="nav-item">
                    <a className="nav-link link text-info text-primary display-4" href="index.html#contacts3-x">Contacto</a>
                </li>
                {(log && veter) && veteLink /*si es veterinario y está logueado muestra el link para veterinarios*/}
                {(log && !veter) && clientLink}
            </ul>
            <LoginBtns 
                log={log} 
                handleLog={handleLog} 
                handleShowForm={handleShowForm} 
            />
        </div>
    )
}

export default NavBar;