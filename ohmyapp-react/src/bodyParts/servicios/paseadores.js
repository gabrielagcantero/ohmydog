import React, { useState } from "react";
import emailjs from 'emailjs-com';

function getPaseadores(){
    const paseadores = [];

    fetch('http://localhost:3000/get-paseadores')
        .then((response) => response.json())
        .then((results) => {results.map((e) => paseadores.push(e))});
    
    return paseadores;
}

let pas = getPaseadores();

const selectZona = (zona, setZona) => {

    const handleOptionChange = (event) => {
        const selectedValue = event.target.value;
        setZona(selectedValue);
    };

    return(
        <div className="col-10 form-inline">
            <label for="zona" className="form-label" style={{marginTop: "10px", paddingRight: "10px"}}>Zona:</label>
            <select className="form-select" style={{width: "30%"}} name="zona" value={zona} onChange={handleOptionChange}>
                <option value="todas" selected>Todas</option>
                <option value="Bosque">Bosque</option>
                <option value="Parque Alberti">Parque Alberti</option>
                <option value="Parque Castelli">Parque Castelli</option>
                <option value="Parque Saavedra">Parque Saavedra</option>
                <option value="Parque Vucetich">Parque Vucetich</option>
                <option value="Plaza Alsina">Plaza Alsina</option>
                <option value="Plaza Azcuénaga">Plaza Azcuénaga</option>
                <option value="Plaza Belgrano">Plaza Belgrano</option>
                <option value="Plaza Dardo Rocha">Plaza Dardo Rocha</option>
                <option value="Plaza Hipólito Yrigoyen">Plaza Hipólito Yrigoyen</option>
                <option value="Plaza Italia">Plaza Italia</option>
                <option value="Plaza Matheu">Plaza Matheu</option>
                <option value="Plaza Moreno">Plaza Moreno</option>
                <option value="Plaza San Martín">Plaza San Martín</option> 
            </select>
            <br/>
        </div>
    )
}

//envía mail al paseador
function sendMail(event){
    const datos = new FormData(event.target); //toma los datos del formulario
    const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto

    const templateParams = {
        to_mail: datosCompletos.emailTo,
        to_name: pas.find((e) => e.email === datosCompletos.emailTo).frist_name,
        message: "Hay una persona interesada en tus servicios. A continuación te dejamos los datos para que te puedas contactar:",
        message2: "Nombre: " + datosCompletos.client
            + "\nMail: " + datosCompletos.mail + "\nTel: " + datosCompletos.tel
    };
    emailjs.init('zH503YKcv1sGAlHMu');
    emailjs.send("service_xtovo5k", "template_n7u8keb", templateParams , "zH503YKcv1sGAlHMu");

    alert("el mensaje ha sido enviado");
    window.location.href = window.location.href;
}

//cuadro de confirmación anted de enviar mail
function consultar(event){
    localStorage.getItem("user")? sendMail(event) : window.confirm("Se enviará un mensaje con sus datos al paseador.") && sendMail(event);
}

//formulario para datos de contacto
const contactData = () => {
    let children;
    if (localStorage.getItem("user")){
        let user = JSON.parse(localStorage.getItem("user"));
        children = (
            <div>  
                <p>Tenga en cuenta que se enviará un mail con sus datos al paseador.</p>
                <input className="form-control" name="client" type="hidden" value={user.frist_name + " " + user.last_name} />
                <input className="form-control" name="mail" type="hidden" value={user.mail}/>
                <input className="form-control" name="tel" type="hidden" value={user.tel} /><br />
            </div> 
        )}
    else {
        children = (
            <div>  
                <input className="form-control" name="client" placeholder="Nombre" pattern="[A-Za-z ]{2,50}" required/>
                <input className="form-control" type="email" name="mail" placeholder="Email" required />
                <input className="form-control" pattern="[0-9]{7-15}" name="tel" placeholder="Teléfono" required /><br />
            </div> 
            )}
    return children;
}

function Paseadores(){
    let [showPaseadores, setShowPaseadores] = useState(false);
    let [zona, setZona] = useState("todas");
    let [showForm, setShowForm] = useState(null);
    

    //muestra/oculta los paseadores
    const muestraPaseadores = () => {
        setShowPaseadores(!showPaseadores);         
    }

    //muestra formulario de contacto
    const muestraForm = (event) => {showForm? setShowForm(null) : setShowForm(event.target.value)};

    //oculta el formulario
    const ocultarForm = () => {setShowForm(null)};

    //formulario para contactar paseador
    const myForm = (emailTo) => {
        return (
        <section data-bs-version="5.1" className="form7 cid-tCtCU4eUuo">
            <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={ocultarForm} ></span> 
            <div className="container">
                <div className="mbr-section-head">
                    <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Contactar a un paseador</strong>
                    </h3>
                </div>
                <div className="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                    <div className="col-lg-12 mx-auto mbr-form">
                        <form onSubmit={consultar} className="mbr-form form-with-styler mx-auto">
                            <div>
                                {contactData()}
                                <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <input name="emailTo" type="hidden" value={emailTo} />
                                </div>
                                <div className="col-auto mbr-section-btn align-center">
                                    <button type="submit" class="btn btn-info display-4"  style={{width: "50%", margin: "auto"}}>Enviar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )}

    //arma la lista de paseadores
    const pasList = (zona) => {
        let children;
        let myPas;
        if (zona !== "todas")
            myPas = pas.filter((e) => e.zona === zona);
        else
            myPas = pas;

        //si hay paseadores devuelve la lista
        if (myPas.length > 0){ 
            children = myPas.map((e) => {
                return( 
                    <div className="col-10 ">
                        <h6 className="card-title2 mbr-fonts-style m-0 mb-3 display-4">
                            <strong>{e.frist_name} {e.last_name} </strong>
                            <button value={e.email} className="btn btn-success" onClick={muestraForm}>Contactar</button> 
                        </h6>
                        <div>
                            <h6 className="card-title mbr-fonts-style mb-3 display-8">
                                <strong>Zona: {(e.zona)} </strong> 
                            </h6>
                            <h6 className="card-title mbr-fonts-style mb-3 display-8">
                                <strong>Precio: ${(e.monto)}/hora </strong> 
                            </h6>
                            <h6 className="card-title mbr-fonts-style mb-3 display-8">
                                <strong>Email: {e.email} </strong> 
                            </h6>
                            <h6 className="card-title mbr-fonts-style mb-3 display-8">
                                <strong>Teléfono: {e.telefono} </strong> 
                            </h6>
                            {e.email === showForm && myForm(e.email)}
                        </div>
                    </div>
                )})}
        //si no hay clientes devuelve mensaje
        else{ 
            children = (
                <div className="col-10">
                    <h6 className="card-title2 mbr-fonts-style m-0 mb-3 display-4">
                        <strong>En este momento no hay paseadores registrados en el sistema para esta zona</strong> 
                    </h6>
                </div>
        )}
        
        return children;
    }

    //muestra los paseadores
    const myPaseadores = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <div class="container">
                <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={muestraPaseadores}></span> 
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Listado de paseadores</strong>
                    </h3>
                    <div className="container">
                        <div >
                            <div className="card-wrapper">
                                <div className="row align-items-center">
                                        {selectZona(zona, setZona)}<br/><br/><br/>
                                        {pasList(zona)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

    //tarjeta de ver paseadores
    const cardPaseadores = (
        <div className="card col-12 col-md-6 col-lg-3">
            <div className="card-wrapper">
                <div className="card-box align-center">
                    <div className="iconfont-wrapper">
                        <span className="mbr-iconfont mbrib-sun" onClick={muestraPaseadores}></span>
                    </div>
                    <h5 className="card-title mbr-fonts-style display-7"><strong>Paseadores</strong></h5>
                    <p className="card-text mbr-fonts-style display-7">Vea datos de los paseadores y contáctelos.</p>
                </div>
            </div>
        </div>
    );

    return (showPaseadores? myPaseadores : cardPaseadores);
}

export default Paseadores;