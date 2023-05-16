import Header from './headerParts/header';
import Footer from './footerParts/footer';
import Body from './bodyParts/body';
import React, { useState, useEffect } from 'react';

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
  const [log, setLog] = useState(false);
  const [veter, setVeter] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleLog = (event) => {
    event.preventDefault();
    setLog(!log);
  };

  const handleShowForm = (event) => {
    event.preventDefault();
    setShowForm(!showForm);
  }

  const handleLogin = (event) => {
    event.preventDefault();
    setShowForm(!showForm);
    setLog(!log);
  }


  const formLogin = (
    <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo">
        <div class="container">
            <div class="mbr-section-head">
                <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                    <strong>Ingreso</strong>
                </h3>
            </div>
            <div class="row justify-content-center mt-4">
                <div class="col-lg-8 mx-auto mbr-form" data-form-type="formoid">
                    <form onSubmit={handleLogin}class="mbr-form form-with-styler mx-auto" data-form-title="Form login">
                        <div class="dragArea row">
                            <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" data-for="user">
                                <input type="email" name="user" placeholder="Usuario" data-form-field="user" class="form-control" value="" />
                            </div>
                            <div data-for="pass" class="col-lg-12 col-md-12 col-sm-12 form-group mb-3">
                                <input type="password" name="pass" placeholder="Contraseña" data-form-field="pass" class="form-control" value="" />
                            </div>
                            <div class="col-auto mbr-section-btn align-center">
                                <button type="submit" class="btn btn-info display-4">Enviar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
  );

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
        {showForm? formLogin : indexPage }
      </div>
  );
}

export default App;
