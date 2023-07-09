import React, { useState, useEffect } from "react";

/* 
    trae todas las campañas y las guarda en un array
*/
function getCampañasActivas(){
    const camp = [];

    fetch('http://localhost:3000/get-campana-activa')
        .then((response) => response.json())
        .then((results) => {results.map((e) => camp.push(e))});
    
    return camp;
}

/* 
    trae todas las tarjetas y las guarda en un array
*/
function getTarjetas(){
    const tarj = [];

    fetch('http://localhost:3000/get-tarjeta')
        .then((response) => response.json())
        .then((results) => {results.map((e) => tarj.push(e))});
    
    return tarj;
}


/*
    guarda la donacion realizada por un cliente
    cuando una cliente realiza una donacion 
*/
/*function donarCliente(event){

    /*  
        tengo que agarra el id de la donacion, quedarme con el id de la persona y todo el formulario de la donacion
    aca faltaria el id de la pesona y creo que el de la donacion(but creo que nop)
    
    const datos = new FormData(event.target); //toma los datos del formulario
    const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto

    //le agrega el campo saldo a datosCompletos(es la resta entre el saldo de la tarjeta y la donacion) NO SE SI ESTARA BIEN
    let saldo_actualizado = tarjeta.saldo - datosCompletos.donacion;
    datosCompletos.push(saldo_actualizado);

    //controlo que el monto(final) de la campaña sea mayor al de la campaña acutal
    //nose bien donde se tendria uqe poner esta condicion
    if(campañaSeleccionada.monto < campañaSeleccionada.monto_actual){
        alert("la campaña ya alcanzo el monto buscado");
    }else{

        let myDonacion = JSON.stringify(datosCompletos);

        //bajo a la BD

        //actualizo el monto_actual de la campaña
        fetch('http://localhost:3000/update-campaña', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: myDonacion})
        .then(function(response) {return response.json();});

        /*
        actualizo el saldo de la tarjeta que se utilizo para pagar la donacion
        hace la resta del saldo de la tarjeta con la donacion realizada 
        
        //hacer la consulta en server

        fetch('http://localhost:3000/update-tarjeta', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: myDonacion})
        .then(function(response) {return response.json();});

        //guardo la donacion en la tabla donar para tener el los historiales de las donaciones
        fetch('http://localhost:3000/store-donacion', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: myDonacion})
        .then(function(response) {return response.json();});

        //actualizo la binificacion por donacion del cliente
        fetch('http://localhost:3000/update-descuento', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: myDonacion})
        .then(function(response) {return response.json();});
        
    }
}*/


/*
    guarda la donacion de un NO cliente
    cuando un NO cliente realiza una donacion -> es lo mismo que el de arriba pero sin la actualizacion de la bonificacion
*/
/*function donarNOCliente(event){

    /*  
        tengo que agarra el id de la donacion, quedarme con el id de la persona y todo el formulario de la donacion
    aca faltaria el id de la pesona y creo que el de la donacion(but creo que nop)
    
    const datos = new FormData(event.target); //toma los datos del formulario
    const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto

    //le agrega el campo saldo a datosCompletos(es la resta entre el saldo de la tarjeta y la donacion) NO SE SI ESTARA BIEN
    let saldo_actualizado = tarjeta.saldo - datosCompletos.donacion;
    datosCompletos.push(saldo_actualizado);

    //controlo que el monto(final) de la campaña sea mayor al de la campaña acutal
    //nose bien donde se tendria uqe poner esta condicion
    if(campañaSeleccionada.monto < campañaSeleccionada.monto_actual){
        alert("la campaña ya alcanzo el monto buscado");
    }else{

        let myDonacion = JSON.stringify(datosCompletos);

        //bajo a la BD

        //actualizo el monto_actual de la campaña
        fetch('http://localhost:3000/update-campaña', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: myDonacion})
        .then(function(response) {return response.json();});

        /*
        actualizo el saldo de la tarjeta que se utilizo para pagar la donacion
        hace la resta del saldo de la tarjeta con la donacion realizada 
        
        //hacer la consulta en server

        fetch('http://localhost:3000/update-tarjeta', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: myDonacion})
        .then(function(response) {return response.json();});

        //guardo la donacion en la tabla donar para tener el los historiales de las donaciones
        fetch('http://localhost:3000/store-donacion', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: myDonacion})
        .then(function(response) {return response.json();});
        
    }
}*/


/*
    cuando el veterinario decide dar de baja una campaña se hace la modificacion en la BD
    recibe el id de la campaña seleccionada
*/
function cerrarCampaña(id){

    //agarro el id de la campaña
    let campaña_cerr = JSON.stringify({"value": id});

    //bajo a la BD
    fetch('http://localhost:3000/desactivar-campaña', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: campaña_cerr})
        .then(function(response) {return response.json();});
}

/*
    cuando el veterinario decide reactivar una campaña se hace la modificacion en la BD
    recibe el id de la campaña seleccionada
*/
function activarCampaña(id){

    //agarro el id de la campaña
    let campaña_act = JSON.stringify({"value": id});

    //bajo a la BD
    fetch('http://localhost:3000/activar-campaña', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: campaña_act})
        .then(function(response) {return response.json();});
}

const campañas = getCampañasActivas();
const tarjetas = getTarjetas();

function VerCampañas(){
    let [showCampañas, setShowCampañas] = useState(false);

    const muestraCamps = () => {setShowCampañas(!showCampañas)};

    //arma la lista de campañas
    const campList = () => {
        let children;
        //filtro de las campañas activas aquellas que no llegaron a la fecha de cierre
        let camp = campañas.filter((c) => new Date(c.fecha_cierre).getTime() > new Date().getTime())

        //si hay paseadores devuelve la lista
        if (camp.length > 0){ 
            children = camp.map((e) => {
                return( 
                    <div className="col-10 ">
                        <h6 className="card-title2 mbr-fonts-style m-0 mb-3 display-4">
                            <strong>{e.nombre} </strong>
                        </h6>
                        <div>
                            <h6 className="card-title mbr-fonts-style mb-3 display-8">
                                <strong>Descripción: </strong>{e.descripcion}
                            </h6>
                            <h6 className="card-title mbr-fonts-style mb-3 display-8">
                                <strong>Monto a recaudar: </strong> {e.monto? "$" + e.monto : "No especificado"}
                            </h6>
                        </div>
                    </div>
                )})}
        //si no hay clientes devuelve mensaje
        else{ 
            children = (
                <div className="col-10">
                    <h6 className="card-title2 mbr-fonts-style m-0 mb-3 display-4">
                        <strong>En este momento no hay campañas activas</strong> 
                    </h6>
                </div>
        )}
        
        return children;
    }

    //muestra los paseadores
    const myCamps = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <div class="container">
                <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={muestraCamps}></span> 
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Listado de campañas activas</strong>
                    </h3>
                    <div className="container">
                        <div >
                            <div className="card-wrapper">
                                <div className="row align-items-center">
                                        {campList()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

    //tarjeta de ver paseadores
    const cardCamps = (
        <div className="card col-12 col-md-6 col-lg-3">
            <div className="card-wrapper">
                <div className="card-box align-center">
                    <div className="iconfont-wrapper">
                        <span className="mbr-iconfont mbrib-gift" onClick={muestraCamps}></span>
                    </div>
                    <h5 className="card-title mbr-fonts-style display-7"><strong>Campañas de donación</strong></h5>
                    <p className="card-text mbr-fonts-style display-7">Colabore con la comunidad a través de una donación.</p>
                </div>
            </div>
        </div>
    );

    return(showCampañas? myCamps : cardCamps);
}

export default VerCampañas;