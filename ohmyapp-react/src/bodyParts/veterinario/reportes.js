import React, { useState } from "react";

/*
    baja a la BD los datos ingresados en el formulario de vacunas A o B
*/
function exportVacun(event){
    //agarro datos del formulario, creo el objeto y lo JSONifico
    let datos = new FormData(event.target);
    let datosCompletos = Object.fromEntries(datos.entries());
    
    //si no se cargo nada en tipo de vacuna es true
    if(Object.entries(datosCompletos.tipo).length === 0 ){
        alert("faltan datos de tipo de vacuna")
    }else{
    
        let dog_vacun = JSON.stringify(datosCompletos);
        //consulta a la BD
        fetch('http://localhost:3000/store-vacuna', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: dog_vacun
        }).then(function(response) {
            return response.json();
        });

        //emito alerta y mensaje de la HU
        alert("La libreta fue actualizada exitosamente exitosamente.");
    }
    window.location.href = window.location.href;
}


/*
    baja a la BD los datos ingresados en el formulario de antiparasitario

    NOSE SI HACER LA VERIFICAICON DE SI PUSO ALGO EN CANTIDAD ACA O SI SE HACE EN OTRO LADO
*/
function exportAntip(event){
    //agarro datos del formulario, creo el objeto y lo JSONifico
    let datos = new FormData(event.target);
    let datosCompletos = Object.fromEntries(datos.entries());

    //si no se cargo nada es true
    if(Object.entries(datosCompletos.cant).length === 0 ){
        alert("faltan los datos de la cantidad de antiparasitario aplicado")
    }else{
         //consulta a la BD
        let dog_antip = JSON.stringify(datosCompletos);
        fetch('http://localhost:3000/store-antiparasitario', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: dog_antip
        }).then(function(response) {
            return response.json();
        });

        //emito alerta y mensaje de la HU
        alert("La libreta fue actualizada exitosamente exitosamente.");
    }

    window.location.href = window.location.href;
}

/*
    baja a la BD los datos ingresados en el formulario de castracion
*/
function exportCastracion(event){
    
    //agarro datos del formulario, creo el objeto y lo JSONifico
    let datos = new FormData(event.target);
    let datosCompletos = Object.fromEntries(datos.entries());
    let dog_cast = JSON.stringify(datosCompletos);

    //consulta a la BD
    fetch('http://localhost:3000/castrar-dog', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: dog_cast
    }).then(function(response) {
        return response.json();
    });

    //emito alerta y mensaje de la HU
    alert("La libreta fue actualizada exitosamente exitosamente.");
    window.location.href = window.location.href;
}

/*
    baja a la BD los datos ingresados en el formulario de consulta
*/
function exportConsulta(event){
    
    //agarro datos del formulario, creo el objeto y lo JSONifico
    let datos = new FormData(event.target);
    let datosCompletos = Object.fromEntries(datos.entries());
    let dog_con = JSON.stringify(datosCompletos);

    //consulta a la BD
    fetch('http://localhost:3000/consulta-dog', {
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