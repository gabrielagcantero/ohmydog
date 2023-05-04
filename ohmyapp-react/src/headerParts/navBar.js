

function NavBar(){
    return(
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
                <li className="nav-item">
                    <a className="nav-link link text-info text-primary display-4" href="index.html#contacts3-x">Contacto</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link link text-info text-primary display-4" href="index.html#features1-y">Veterinario</a>
                </li>
            </ul>
            <div className="navbar-buttons mbr-section-btn">
                <a className="btn btn-info display-4" href="login.html">Ingresar</a>
                <a className="btn btn-info display-4" href="login.html">Salir</a>
            </div>
        </div>
    )
}

export default NavBar;