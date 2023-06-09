
import  { LoginBtns } from '../LoginBtns';

function NavBar({ log, veter, handleLog, handleShowForm, handleShowPerfil }){
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

    const miPerfil = (
        <li className="nav-item">
            <a className="nav-link link text-info text-primary display-4" href="index.html" onClick={handleShowPerfil}>Ver Perfil</a>
        </li>
    )


    return(
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
                <li className="nav-item">
                    <a className="nav-link link text-info text-primary display-4" href="index.html#contacts3-x">Contacto</a>
                </li>
                {((log && veter )|| (localStorage.getItem("logged") === "true" && localStorage.getItem("veter") === "true")) && veteLink /*si es veterinario y está logueado muestra el link para veterinarios*/}
                {((log && !veter) || (localStorage.getItem("logged") === "true" && localStorage.getItem("veter") === "false")) && clientLink}
                {(localStorage.getItem("logged") === "true" && localStorage.getItem("veter") === "false") && miPerfil}
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