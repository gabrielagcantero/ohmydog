import React, { useState, useEffect } from "react";

/* 
    trae todas las campañas y las guarda en un array
*/
function getCampañas(){
    const camp = [];

    fetch('http://localhost:3000/get-campaña-activa')
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
function donarCliente(event){

    /*  
        tengo que agarra el id de la donacion, quedarme con el id de la persona y todo el formulario de la donacion
    aca faltaria el id de la pesona y creo que el de la donacion(but creo que nop)
    */
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
        */
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
}


/*
    guarda la donacion de un NO cliente
    cuando un NO cliente realiza una donacion -> es lo mismo que el de arriba pero sin la actualizacion de la bonificacion
*/
function donarNOCliente(event){

    /*  
        tengo que agarra el id de la donacion, quedarme con el id de la persona y todo el formulario de la donacion
    aca faltaria el id de la pesona y creo que el de la donacion(but creo que nop)
    */
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
        */
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
}


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

const campañas = getCampañas();
const tarjetas = getTarjetas();