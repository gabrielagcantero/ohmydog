import LoginBtns from './loginBtns';
import VeteLink from './veteLink';

function NavBar(){
    return(
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
                <li className="nav-item">
                    <a className="nav-link link text-info text-primary display-4" href="index.html#contacts3-x">Contacto</a>
                </li>
                <VeteLink />
            </ul>
            <LoginBtns />
        </div>
    )
}

export default NavBar;