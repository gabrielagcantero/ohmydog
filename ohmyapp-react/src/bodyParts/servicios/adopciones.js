import React, { useState } from "react";
import emailjs from 'emailjs-com';

//trae los perros en adopción y los devuelve en un array (conectar con BD)
function getDogs(){
    const dogs = [];

    fetch('http://localhost:3000/get-adopdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => dogs.push(e))});
    
    return dogs;
}

//trae los mails de los clientes y los devuelve en un array
function getClients(){
    let mails= [];

    fetch('http://localhost:3000/get-clientdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => mails.push(e));
        });

    return mails;
}

let dogs = getDogs();
let clients = getClients();

function sendMail(event){
    event.preventDefault();
    const datos = new FormData(event.target); //toma los datos del formulario
    const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto
    const templateParams = {
        to_mail: datosCompletos.owner,
        to_name: clients.find((c) => c.mail === datosCompletos.owner).frist_name,
        message: "Hay una persona interesada en el perro " + datosCompletos.dog + " que pusiste en adopción. A continuación te dejamos los datos para que te puedas contactar:",
        message2: "Nombre: " + datosCompletos.client
            + "\nMail: " + datosCompletos.mail + "\nTel: " + datosCompletos.tel
            + "\nMotivo de la adopción: " + datosCompletos.why
    };
    emailjs.init('zH503YKcv1sGAlHMu');
    emailjs.send("service_xtovo5k", "template_n7u8keb", templateParams , "zH503YKcv1sGAlHMu");

    alert("el mensaje ha sido enviado");
    window.location.href = window.location.href;
}

function consultar(event){
    event.preventDefault();
    window.confirm("Se enviará un mensaje con sus datos a la persona que publicó el perro.") && sendMail(event);
}

//formulario para adoptar
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
                <input className="form-control" name="client" placeholder="Nombre" pattern="[A-Za-z ]{2,50}" required/>
                <input className="form-control" type="email" name="mail" placeholder="Email" required />
                <input className="form-control" pattern="[0-9]{7-15}" name="tel" placeholder="Teléfono" required /><br />
            </div>
            )}
    return children;
}

function Adopciones(){
    let[showDogs, setShowDogs] = useState(false);
    let[showForm, setShowForm] = useState(null);

    //muestra/oculta los datos de los perros
    const muestraDogs = () => {setShowDogs(!showDogs)};

    //muestra formulario de adopcion
    const muestraForm = (event) => {showForm? setShowForm(null) : setShowForm(event.target.value)};

    //oculta el formulario
    const ocultarForm = () => {setShowForm(null)};

    //formulario para modificar el turno
    const myForm = (e) => {
        return (
        <section data-bs-version="5.1" className="form7 cid-tCtCU4eUuo">
            <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={ocultarForm} ></span> 
            <div className="container">
                <div className="mbr-section-head">
                    <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Adopción de perro</strong>
                    </h3>
                </div>
                <div className="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                    <div className="col-lg-12 mx-auto mbr-form">
                        <form onSubmit={consultar} className="mbr-form form-with-styler mx-auto">
                            <div>   
                                {contactData()}
                                <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <label for="why">Ingrese el motivo de la adopción:</label><br/>
                                    <textarea name="why" rows="5" class="form-control" required></textarea>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <input name="dog" type="hidden" value={e.name} />
                                    <input name="owner" type="hidden" value={e.owner} />
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
    )};
    
    //arma la lista de perros
    function dogList(showForm){
        let children;

        //si hay perros devuelve la lista
        if (dogs.length > 0){ 
            children = dogs.map((e) => {
                return( 
                    <div className="col-10">
                        <h6 className=" card-title2 mbr-fonts-style m-0 mb-3 display-4">
                            <strong>{e.name}</strong> 
                        </h6>
                        <div>
                            <h6 className="card-title mbr-fonts-style mb-3 display-7">
                                <strong>Edad aproximada: {e.age} </strong> 
                            </h6>
                            <h6 className="card-title mbr-fonts-style mb-3 display-7">
                                <strong>Raza: {e.breed} </strong> 
                            </h6>
                            <h6 className="card-title mbr-fonts-style mb-3 display-7">
                                <strong>Color: {e.color} </strong> 
                            </h6>
                            <h6 className="card-title mbr-fonts-style mb-3 display-7">
                                <strong>Origen: {e.origin} </strong> 
                            </h6>
                            <h6 className="card-title mbr-fonts-style mb-3 display-7">
                                <strong>Sexo: {e.sex === "m"? "macho" : "hembra"} </strong> 
                            </h6>
                            <h6 className="card-title mbr-fonts-style mb-3 display-7">
                                <strong>Características adicionales: {e.obs? e.obs : "-"} </strong> 
                            </h6>
                            <button value={e.id_perroadop} className="btn btn-success" onClick={muestraForm}>Adoptar</button>
                            {String(e.id_perroadop) === showForm && myForm(e)}
                            <br/><br/><br/>
                        </div>
                    </div>
                )})}
        //si no hay perros devuelve mensaje
        else{ 
            children = (
                <h6 className="card-title2 mbr-fonts-style m-0 mb-3 display-4">
                    <strong>En este momento no hay perros para adoptar</strong> 
                </h6>
        )}
        
        return children;
    }

    //muestra perros
    const DogsAdop = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <div class="container">
                <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={muestraDogs}></span> 
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Perros en adopción</strong>
                    </h3>
                    <div className="container">
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="row align-items-center">
                                    <div className="col-10 col-md">
                                        {dogList(showForm)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
    
    //tarjeta de perros del cliente
    const cardDogsAdop = (
        <div className="card col-12 col-md-6 col-lg-3">
            <div className="card-wrapper">
                <div className="card-box align-center">
                    <div className="iconfont-wrapper">
                        <span className="mbr-iconfont mobi-mbri-hearth mobi-mbri" onClick={muestraDogs}></span>
                    </div>
                    <h5 className="card-title mbr-fonts-style display-7"><strong>Adopciones</strong></h5>
                    <p className="card-text mbr-fonts-style display-7">Ofrézcale hogar a un perrito que lo necesita.</p>
                </div>
            </div>
        </div>
    )
    
    return (showDogs? DogsAdop : cardDogsAdop)
}

export default Adopciones;