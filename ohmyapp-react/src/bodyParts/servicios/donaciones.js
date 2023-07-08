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
    guarda la donacion
    cuando una persona realiza una donacion 
*/
function donar(event){

    /*  
        tengo que agarra el id de la donacion, quedarme con el id de la persona y todo el formulario de la donacion
    aca faltaria el id de la pesona y creo que el de la donacion(but creo que nop)
    */
    const datos = new FormData(event.target); //toma los datos del formulario
    const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto


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

        //actualizo el saldo de la tarjeta que se utilizo para pagar la donacion
        //hacer la consulta en server
    
        fetch('http://localhost:3000/update-tarjeta', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: myDonacion})
        .then(function(response) {return response.json();});

        //guardo la donacion en la tabla donar para tener el los historiales de las donaciones
        fetch('http://localhost:3000/store-donacion, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: myDonacion})
        .then(function(response) {return response.json();});
    }



}



const campañas = getCampañas();
const tarjetas = getTarjetas();