

/*  
    Metodos get de persona y perro
*/

//trae los perros y los devuelve en un array
function getDogs(){
    const dogs = [];

    fetch('http://localhost:3000/get-ownerdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => dogs.push(e))});
    
    return dogs;
}

//trae SOLO los clientes y los devuelve en un array
function getClients(){
    let cli= [];

    fetch('http://localhost:3000/get-only-clientdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => cli.push(e));
        });

    return cli;
}

const dogs = getDogs();
const clients = getClients();

/*
    agarra los datos del formulario y los baja a la BD
    del formulario va a agarrar el "mail"(del cliente),"day", "id_perro" y "obs" para bajarlos a la BD(son los que voy a usar en el back)
*/
function exportUrgencia(event){

    let datos = new FormData(event.target); //toma los datos del formulario
    let datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto

    let datos_urgen = JSON.stringify(datosCompletos);

    //consulta BD
    fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: datos_urgen
    }).then(function(response) {
        return response.json();
    });

    //informo que la libreta fue actualizada correctamente
    alert("La libreta fue actualizada correctamente")

    //recargo la pagina
    window.location.href = window.location.href;

}



function Urgencias(){
    return(
        <div className="card col-12 col-md-6 col-lg-3">
            <div className="card-wrapper">
                <div className="card-box align-center">
                    <div className="iconfont-wrapper">
                        <span className="mbr-iconfont mobi-mbri-alert mobi-mbri" ></span>
                    </div>
                    <h5 className="card-title mbr-fonts-style display-7"><strong>Urgencias</strong></h5>
                    <p className="card-text mbr-fonts-style display-7">Esta es una tarjeta de muestra. No tiene funcionalidad aún</p>
                </div>
            </div>
        </div>
    )
}

export default Urgencias;
