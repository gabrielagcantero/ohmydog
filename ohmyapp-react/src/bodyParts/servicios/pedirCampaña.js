import React, { useState } from "react";
import emailjs from 'emailjs-com';

function sendMail(event){
    event.preventDefault();
    const datos = new FormData(event.target); //toma los datos del formulario
    const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto
    let refugio = "";
    if (datosCompletos.refugio)
        refugio = " para el refugio " + datosCompletos.refugio;
    
    const templateParams = {
        to_mail: "ohmydogveterinarialp@gmail.com",
        to_name: "",
        message: datosCompletos.client + " ha solicitado una campaña de donación" + refugio,
        message2: "\nMail: " + datosCompletos.mail + "\nTel: " + datosCompletos.tel
            + "\nMotivo de la solicitud: " + datosCompletos.why + "\nMonto solicitado: $" + datosCompletos.monto
    };
    emailjs.init('zH503YKcv1sGAlHMu');
    emailjs.send("service_xtovo5k", "template_n7u8keb", templateParams , "zH503YKcv1sGAlHMu");

    alert("el mensaje ha sido enviado");
    window.location.href = window.location.href;
}

//cuadro de confirmación anted de enviar mail
function consultar(event){
    event.preventDefault();
    window.confirm("Se enviará un mensaje con los datos a la veterinaria.") && sendMail(event);
}

//datos de contacto
const contactData = () => {
    let children;
    if (localStorage.getItem("user")){
        let user = JSON.parse(localStorage.getItem("user"));
        children = (
            <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                <input name="client" type="hidden" value={user.frist_name + " " + user.last_name}/>
                <input name="mail" type="hidden" value={user.mail} />
                <input name="tel" type="hidden" value={user.tel} />
            </div>
        )}
    else {
        children = (
            <div>
                <input className="form-control" name="client" placeholder="Nombre y apellido" pattern="[A-Za-z ]{2,50}" required/>
                <input className="form-control" type="email" name="mail" placeholder="Email" required />
                <input className="form-control" pattern="[0-9]{7-15}" name="tel" placeholder="Teléfono" required /><br />
            </div>
            )}
    return children;
}

function PedirCampaña() {
    let [showForm, setShowForm] = useState(false); 

    const muestraForm = () => {setShowForm(!showForm)}; //muestra/oculta el formulario

    //muestra perros
    const pedirCampaña = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <div class="container">
                <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={muestraForm} ></span> 
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Solicitar campaña de donación</strong>
                    </h3>
                </div>
                <div className="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                    <div className="col-lg-12 mx-auto mbr-form">
                        <form onSubmit={consultar} className="mbr-form form-with-styler mx-auto">
                            <div>   
                                {contactData()}
                                <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <label for="refugio">Si la solicitud es para un refugio, ingrese el nombre del refugio:</label><br/>
                                    <input name="refugio" class="form-control"/>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <label for="why">Ingrese el motivo de la solicitud:</label><br/>
                                    <textarea name="why" rows="5" class="form-control" required></textarea>
                                </div>
                                <div class="form-inline" >
                                    <label style={{paddingTop:"15px"}} for="monto">Monto solicitado: $</label><br/>
                                    <input style={{width:"30%", marginLeft:"5px", marginRight:"5px"}} type="number" step="0.01" min="0.00" name="monto" class="form-control" required/>
                                </div>
                                <div className="col-auto mbr-section-btn align-center">
                                    <p></p>
                                    <button type="submit" class="btn btn-info display-4"  style={{width: "50%", margin: "auto"}}>Enviar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
    
    //tarjeta de perros del cliente
    const cardCampaña = (
        <div className="card col-12 col-md-6 col-lg-3">
            <div className="card-wrapper">
                <div className="card-box align-center">
                    <div className="iconfont-wrapper">
                        <span className="mbr-iconfont mobi-mbri-cash mobi-mbri" onClick={muestraForm}></span>
                    </div>
                    <h5 className="card-title mbr-fonts-style display-7"><strong>Solicitar campaña</strong></h5>
                    <p className="card-text mbr-fonts-style display-7">Complete éste formulario para pedir una campaña de donación</p>
                </div>
            </div>
        </div>
    )
    
    return (showForm ? pedirCampaña : cardCampaña);
}

export default PedirCampaña;