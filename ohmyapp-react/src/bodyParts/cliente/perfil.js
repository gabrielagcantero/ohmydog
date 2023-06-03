import React, { useState } from "react";


/*
    obtiene los datos del cliente desde la BD -> lo pense como si ubiera un boton y muestre directamente la wea
*/
function datosClientePerfil(id){
    let cli = JSON.stringify({"value": id})
    
    //solicitud a la BD
    let cliente = fetch('http://localhost:3000/get-clientdataID')
        .then((response) => response.json());

    return cliente;
}

//falta la parte de hacer visible la wea, con suerte mañana sabre como hacerlo 

export default perfil;