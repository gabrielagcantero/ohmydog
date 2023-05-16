
import  { VeteLink } from '../log';
import  { LoginBtns } from '../log';

function NavBar({ log, veter, handleLog, showForm, handleShowForm }){
    return(
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
                <li className="nav-item">
                    <a className="nav-link link text-info text-primary display-4" href="index.html#contacts3-x">Contacto</a>
                </li>
                <VeteLink veter={veter} />
            </ul>
            <LoginBtns log={log} veter={veter} handleLog={handleLog} showForm={showForm} handleShowForm={handleShowForm} />
        </div>
    )
}

export default NavBar;