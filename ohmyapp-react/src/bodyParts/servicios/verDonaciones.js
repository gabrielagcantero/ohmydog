import React, { useState, useEffect } from "react";

/* 
    trae todas las donaciones y las guarda en un array
*/
function getDonaciones(){
    const don = [];

    fetch('http://localhost:3000/get-donar')
        .then((response) => response.json())
        .then((results) => {results.map((e) => don.push(e))});
    
    return don;
}

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
    trae todas las personas registradas y las guarda en un array
*/
function getPersonas(){
    const pers = [];

    fetch('http://localhost:3000/get-clientdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => pers.push(e))});
    
    return pers;
}

const donaciones = getDonaciones();
const campañas = getCampañas();
const personas = getPersonas();


function mostrar(){
    let donacion; //->seria una donacion
    //filter que busca a la persona con el id
    let person = personas.filter((e) => e.id_persona === donacion.id_persona)
    //filter que busca a la campaña con el id
    let campaña = campañas.filter((e) => e.id_campaña === donacion.id_campaña)
}
