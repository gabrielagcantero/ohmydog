import React, { useState, useEffect } from "react";


/*
    agarra los datos del formulario de campañay los baja a la BD
*/
function exportCampaña(event){
    const datos = new FormData(event.target); //toma los datos del formulario
    const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto
    
    //Controles
    //control Fecha -> si la fecha de finalizacion ingresada es previa a la actual
    if (new Date(datosCompletos.fecha_cierre).getTime() < new Date().getTime()){ 
        alert("La fecha de finalizacion de campaña debe ser posterior a la fecha actual")
    }else{
        //control de los campos incompletos


        let myCampaña = JSON.stringify(datosCompletos); //lo paso a JSON

        //lo lleva a la BD
        fetch('http://localhost:3000/store-dogAdop', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: myCampaña})
            .then(function(response) {return response.json();});
    }
    
    alert("La campaña se creo correctamente");
    window.location.href = window.location.href;
}

