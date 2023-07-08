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
    guarda la donacion
    cuando una persona realiza una donacion 
*/




const campañas = getCampañas();