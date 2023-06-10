import React, { useState } from 'react';
import emailjs from 'emailjs-com';

//trae los mails de los clientes y los devuelve en un array
function getMails(){
    const mails= [];

    fetch('http://localhost:3000/get-clientdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => mails.push(e.mail));
        });

    return mails;
}

let mails = getMails();

//genera una pass aleatoria de 8 carácteres
function generatePass() {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
            'abcdefghijklmnopqrstuvwxyz0123456789@#$';
      
    for (let i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random()
                    * str.length + 1);
          
        pass += str.charAt(char)
    }
      
    return pass;
}

//envía el mail con el usuario y la contraseña
function sendMail(datos){
    const templateParams = {
        to_mail: datos.mail,
        to_name: datos.name,
        message: "Nos alegra que te hayas registrado. A continuación te dejamos tus datos de registro:",
        message2: "Usuario: " + datos.mail + "\nContraseña: " + datos.pass
    };
    emailjs.init('zH503YKcv1sGAlHMu');
    emailjs.send("service_xtovo5k", "template_n7u8keb", templateParams , "zH503YKcv1sGAlHMu");
}

//guarda en "myClient" los datos del cliente en formato Json y los pasa a la BD
function exportCli(event){
    const datos = new FormData(event.target); //toma los datos del formulario
    const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto
    let guardado = false;
    
    //controles
    if (new Date(datosCompletos.nac).getTime() > new Date().getTime()){ //controla la fecha
        alert("La fecha de nacimiento debe ser anterior a la fecha actual")
    } else {
        //ver si el mail ya está registrado
        if (mails.includes(datosCompletos.mail))
            alert("El mail que ingresó ya se encuentra registrado en el sistema")
        else {//si está todo bien
            datosCompletos.pass = generatePass();
            let myClient = JSON.stringify(datosCompletos)

            //lo lleva a la BD
            fetch('http://localhost:3000/store-clientdata', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: myClient
            }).then(function(response) {
                return response.json();
            });

            sendMail(datosCompletos);

            alert("Los datos del nuevo cliente han sido guardados");
            mails = getMails();
            window.location.href = window.location.href;
        }
    }
    return guardado;
}

function CargaCli(){

    let [showCargaCli, setShowCargaCli] = useState(false); 

    const CargaCliente = () => {setShowCargaCli(!showCargaCli)}; //muestra/oculta el formulario

    const guardar = (event) => {
            event.preventDefault(); //para que no refresque por defecto
            exportCli(event);
        };

    // formulario para carga de cliente
    const formCargaCli = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={CargaCliente}></span> 
            <div class="container">
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Carga de nuevo cliente</strong>
                    </h3>
                </div>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                    <div class="col-lg-12 mx-auto mbr-form">
                        <form onSubmit={guardar} class="mbr-form form-with-styler mx-auto" data-form-title="Carga de cliente" id="cliForm">
                            <div class="dragArea row">
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <input type="text" pattern="[a-zA-Z ]{2,40}" name="name" placeholder="Nombre" class="form-control" required/>
                                    <input type="text" pattern="[a-zA-Z ]{2,20}" name="lastName" placeholder="Apellido" class="form-control" required />
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <label for="nac" >Fecha de nacimiento</label>
                                    <input type="date" name="nac" class="form-control" required />
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <input type="email" name="mail" placeholder="Email" class="form-control" required />
                                    <input type="text" pattern="[0-9]{8,13}" name="tel" placeholder="Teléfono" class="form-control" required/>
                                </div>

                                <div class="col-auto mbr-section-btn align-center">
                                    <button type="submit" class="btn btn-info display-4"  style={{width: "50%", margin: "auto"}}>Guardar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    );

    //tarjeta de Cargar cliente
    const cardCargaCli = ( 
    <div className="card col-12 col-md-6 col-lg-3">
        <div className="card-wrapper">
            <div className="card-box align-center">
                <div className="iconfont-wrapper">
                    <span className="mbr-iconfont mobi-mbri-users mobi-mbri" onClick={CargaCliente}></span>
                </div>
                <h5 className="card-title mbr-fonts-style display-7"><strong>Cargar cliente</strong></h5>
            
                <p className="card-text mbr-fonts-style display-7">Cargar los datos de un nuevo cliente.</p>
            </div>
        </div>
    </div>
    );

    return(
        <>{showCargaCli ? formCargaCli : cardCargaCli}</>
    )
    
}

export default CargaCli;