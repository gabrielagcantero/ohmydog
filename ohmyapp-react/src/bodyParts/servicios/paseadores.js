import React from "react";

function getPaseadores(){
    const paseadores = [];

    fetch('http://localhost:3000/get-paseadores')
        .then((response) => response.json())
        .then((results) => {results.map((e) => paseadores.push(e))});
    
    return paseadores;
}

let paseadores = getPaseadores();

function Paseadores(){
    console.log(paseadores);
}

export default Paseadores;