import Header from './headerParts/header';
import Footer from './footerParts/footer';
import Body from './bodyParts/body';
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';

import './assets/bootstrap/css/bootstrap.min.css';
import './assets/bootstrap/css/bootstrap-grid.min.css';
import './assets/bootstrap/css/bootstrap-reboot.min.css';
import './assets/bootstrap/js/bootstrap.bundle.min.js';
import './assets/dropdown/css/style.css';
import './assets/dropdown/js/navbar-dropdown.js';
import './assets/smoothscroll/smooth-scroll.js';
import './assets/socicon/css/styles.css';
import './assets/socicon/fonts/socicon.eot';
import './assets/socicon/fonts/socicon.svg';
import './assets/socicon/fonts/socicon.ttf';
import './assets/socicon/fonts/socicon.woff';
import './assets/socicon/fonts/socicon.woff2';
import './assets/theme/css/style.css';
import './assets/theme/js/script.js';
import './assets/mobirise/css/mbr-additional.css';
import './assets/web/assets/mobirise-icons2/mobirise2.css';
import './assets/web/assets/mobirise-icons2/mobirise2.eot';
import './assets/web/assets/mobirise-icons2/mobirise2.svg';
import './assets/web/assets/mobirise-icons2/mobirise2.ttf';
import './assets/web/assets/mobirise-icons2/mobirise2.woff';
import './assets/web/assets/mobirise-icons-bold/mobirise-icons-bold.css';
import './assets/web/assets/mobirise-icons-bold/mobirise-icons-bold.eot';
import './assets/web/assets/mobirise-icons-bold/mobirise-icons-bold.svg';
import './assets/web/assets/mobirise-icons-bold/mobirise-icons-bold.ttf';
import './assets/web/assets/mobirise-icons-bold/mobirise-icons-bold.woff';
import './assets/ytplayer/index.js';



function App() {
  const [log, setLog] = useState(false); //true si está logueado
  const [veter, setVeter] = useState(false); //true si el logueado es veterinario
  const [showForm, setShowForm] = useState(false); //true si muestra el formulario de login

  const handleLog = (event) => {
    event.preventDefault();
    setLog(!log);
  };

  const handleShowForm = (event) => {
    event.preventDefault();
    setShowForm(!showForm);
  }

  //formulario de login
  const loginForm = <LoginForm 
      setLog={setLog}
      setVeter={setVeter}
      setShowForm={setShowForm}
      handleShowForm={handleShowForm}
    />;

  //pagina de inicio
  const indexPage = (
    <>
      <Header 
        log={log} 
        veter={veter} 
        handleLog={handleLog} 
        showForm={showForm}
        handleShowForm={handleShowForm} 
      />
      <Body log={log} veter={veter}/>
      <Footer />
    </>
  );
  
  return (
      <div>
        {showForm? loginForm : indexPage }
      </div>
  );
}

export default App;
