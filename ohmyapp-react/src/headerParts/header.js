import Logo from './logo';
import BurgerMenu from './burgerMenu';
import NavBar from './navBar';
import React from 'react';

function Header({ log, veter, handleLog, handleShowForm, handleShowPerfil }){
    return(
      <section data-bs-version="5.1" className="menu menu2 cid-tCtsBVbV6y" once="menu" id="header">
        <nav className="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
          <div className="container-fluid">
            <Logo />
            <BurgerMenu />
            <NavBar 
              log={log} 
              veter={veter} 
              handleLog={handleLog} 
              handleShowForm={handleShowForm} 
              handleShowPerfil={handleShowPerfil}
            />
          </div>
        </nav>
      </section>
    )
}

export default Header;