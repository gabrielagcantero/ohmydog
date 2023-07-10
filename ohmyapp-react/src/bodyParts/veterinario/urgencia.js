import React, { useState, useEffect } from "react";

//trae los perros y los guarda en un array
function getDogs(){
    const dogs = [];

    fetch('http://localhost:3000/get-ownerdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => dogs.push(e))});
    
    return dogs;
}

//trae los clientes y los devuelve en un array
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

function consultar(event){
    event.preventDefault();
    window.confirm("La información será enviada a la libreta sanitaria del perro.") && send(event);
}

//carga el reporte del turno
function send(event){
    //agarro datos del formulario, creo el objeto
    let datos = new FormData(event.target);
    let datosCompletos = Object.fromEntries(datos.entries());

    //controla que se haya ingresado un valor en el campo de total
    if (!datosCompletos.total)
        alert("Debe ingresar un valor en 'Valor de la consulta' y calcular el total.");
    else {
        //claculo lo que le queda de la bonificación
        datosCompletos.bonif = Math.max(parseFloat(datosCompletos.bonif) - parseFloat(datosCompletos.price), 0);

        let dog_con = JSON.stringify(datosCompletos); //Jsonifico
        
        //manda a la BD (body: dog_con campos: id_perro, date, obs, monto)
        fetch('http://localhost:3000/store-urgencia', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: dog_con
        }).then(function(response) {
            return response.json();
        });

        //update del descuento del usuario (body: dog_con campos: client, total )
        fetch('http://localhost:3000/update-descuento', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: dog_con
        }).then(function(response) {
            return response.json();
        });

        //emito alerta y mensaje de la HU
        alert("La libreta fue actualizada exitosamente exitosamente.");
        window.location.href = window.location.href;
    }
}

function setearFecha(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDay()+2;
    return ''+year+'-'+month+'-'+day+''
}


function Urgencia({ dog }){
    const [price, setPrice] = useState(0);
    const [total, setTotal] = useState('');

    let myDog = dogs.find((d => d.id === dog));
    let myClient = clients.find((c => c.mail=== myDog.owner));

    const handlePrice = (event) => {
        setPrice(parseFloat(event.target.value)); // Actualizar el valor cuando cambie el input
    }

    //calcula el monto a cobrar
    const calcular = () => {
        setTotal(Math.max(parseFloat(price) - parseFloat(myClient.bonif_donacion), 0));
        console.log(total);
    }

    useEffect(() => {
        // Muestra el total a cobrar
        document.getElementById("mytotal").innerText = 'Total a cobrar: $' + total;
    });

    return (
    <section data-bs-version="5.1" className="form7 cid-tCtCU4eUuo">
        <div className="container">
            <div className="mbr-section-head">
                <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                    <strong>Carga de urgencia para {myDog.name}</strong>
                </h3>
            </div>
            <div className="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                    <form style={{width:"80%"}} onSubmit={consultar} className="mbr-form form-with-styler mx-auto">
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                            <label for="obs">Observaciones:</label><br/>
                            <textarea name="obs" rows="5" class="form-control"></textarea>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group row mb-3" >
                            <p>Bonificación del cliente: ${myClient.bonif_donacion}</p>
                            <div class="form-inline" >
                                <label for="monto" style={{paddingTop:"5px"}}>Valor de la consulta: $</label>
                                <input name="price" style={{width:"20%", marginLeft:"5px", marginRight:"5px"}} type="number" step="0.01" min="0.00" value={price} onChange={handlePrice} required/>
                                <span><button type="button" className="btn-outline-primary btn-sm" onClick={calcular}>Calcular total</button></span>
                            </div>
                            <p></p>
                            <p id="mytotal"></p>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                            <input name="id_perro" type="hidden" value={myDog.id} />
                            <input name="date" type="hidden" value={setearFecha()} />
                            <input name="monto" type="hidden" value={total} />
                            <input name="client" type="hidden" value={myClient.id_persona} />
                            <input name="bonif" type="hidden" value={myClient.bonif_donacion} />
                        </div>
                        <div className="col-auto mbr-section-btn align-center">
                            <button type="submit" class="btn btn-info display-4"  style={{width: "50%", margin: "auto"}}>Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Urgencia;