import Logo from './logo';
import BurgerMenu from './burgerMenu';
import NavBar from './navBar';

function Header(){
    return(
      <section data-bs-version="5.1" className="menu menu2 cid-tCtsBVbV6y" once="menu" id="menu2-l">
        <nav className="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
          <div className="container-fluid">
            <Logo />
            <BurgerMenu />
            <NavBar />
          </div>
        </nav>
      </section>
    )
}

export default Header;