import React, { useState } from "react";

//trae los turnos y los guarda en un array
function getTurns(){
    const turns= [];

    fetch('http://localhost:3000/get-turndata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => turns.push(e));
        });

    return turns;
}

//trae los perros y los devuelve en un array
function getDogs(){
    const dogs = [];

    fetch('http://localhost:3000/get-ownerdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => dogs.push(e))});
    
    return dogs;
}

let turns = getTurns();
let dogs = getDogs();

//elimina un turno
function eliminarTurno(event){
    let myBody = JSON.stringify({"value": event.target.value});
    //lo lleva a la BD
    fetch('http://localhost:3000/delete-turndata', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: myBody})
        .then(function(response) {return response.json();});

    alert ("el turno ha sido eliminado");
    window.location.href = window.location.href;
}

//pide confirmación antes de eliminar
const consultar = (event) => {
    window.confirm("Está seguro que desea eliminar éste turno?") && eliminarTurno(event);
}

/*actualizo los turnos eliminando y agregarndo
cuando se elige modificar, elimino el turno automaticamente, se muestra el nuevo formulario 
y guardo el nuevo turno ingresado 
function updateTurnsElim(event){

    //elimino el turno
    eliminarTurno();

    //muestra el formulario para el nuevo turno
    // -> nose como hacer que muestre el formulario desde turnos jeje
    //turnos(); //nose si esto estara bien o funciona 
    const datos = new FormData(event.target); //toma los datos del formulario
    const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto
    

    //llevo los datos modificados a la BD
    let update_turn = JSON.stringify(datosCompletos); //convierto lo del formulario a un JaSON

    fetch('http://localhost:3000/store-turndata', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: update_turn
        }   
    ).then(function(response) {
        return response.json();
        });

    //tiro alerta para visualizar la confirmacion del la modificacion del turno
    alert("El turno ha sido modificado correctamente");
    //no entiendo bien para que sirven estas ultimas 2 lineas pero como estan en las otras altas/modificaciones las dejo
    turns = getTurns(); //esta línea hace que vuelva a hacer fetch para que el array de turnos se actualice
    window.location.href = window.location.href; //esta línea refresca la página
}


//actualizo los turnos con metodo update 
function updateTurnsUpdate(event){
    const datos = new FormData(event.target); //toma los datos del formulario
    const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto

    //llevo los datos modificados a la BD
    let update_turn = JSON.stringify(datosCompletos); //convierto lo del formulario a un JaSON

    fetch('http://localhost:3000/update-turndata', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: update_turn
        }   
    ).then(function(response) {
        return response.json();
        });

    //tiro alerta para visualizar la confirmacion del la modificacion del turno
    alert("El turno ha sido modificado correctamente");
    //no entiendo bien para que sirven estas ultimas 2 lineas pero como estan en las otras altas/modificaciones las dejo
    turns = getTurns();
    window.location.href = window.location.href; 
}*/



//arma la lista de turnos
function turnList(showForm, setShowForm) {
    let user = JSON.parse(localStorage.getItem("user")).mail;
    let filteredTurns = turns.filter((e) => (e.client === user && new Date(e.day).getTime() >= new Date().getTime()));
    let children;

    //muestra/oculta el formulario para modificar turno
    const mostrarModif = (event) => {
        //let turn = turns.filter((e) => e.id == event.target.value);
        setShowForm(!showForm);
    }

    //formulario para modificar el turno
    const modifForm = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={mostrarModif}></span> 
            <div class="container">
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Modificación de turno</strong>
                    </h3>
                </div>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                    <div class="col-lg-12 mx-auto mbr-form">
                        <form onSubmit="" class="mbr-form form-with-styler mx-auto" data-form-title="Carga de cliente" id="cliForm">
                            <div class="dragArea row">
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <label for="day" >Seleccione la nueva fecha</label>
                                    <input type="date" name="day" class="form-control" required />
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                    <select name="time" class="form-control" required>
                                        <option value="" selected disabled>Seleccione la nueva franja horaria</option>
                                        <option value="mañana">mañana (8 a 13hs)</option>
                                        <option value="tarde">tarde (15 a 17.30hs)</option>
                                        <option value="noche">noche (17.30 a 20hs)</option>
                                    </select> 
                                </div>
                                <div class="col-auto mbr-section-btn align-center">
                                    <button type="submit" class="btn btn-info display-4"  style={{width: "50%", margin: "auto"}}>Modificar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )

    //si hay turnos devuelve la lista
    if (filteredTurns.length > 0){ 
        children = filteredTurns.map((t) => {
            let dogName = dogs.filter((d) => d.id === t.dog).map((n) => n.name);
            let show = true;
            return ( 
                <div className="container">
                    <div className="card">
                        <div className="card-wrapper">
                            <div className="row align-items-center">
                                <div className="col-10 col-md">
                                    <div className="card-box">
                                        <h5 className=" card-title2 mbr-fonts-style m-0 mb-3 display-5">
                                            <strong>{t.day.substring(0,10)} por la {t.hour} </strong> 
                                            <button value={t.id} className="btn btn-success" onClick={mostrarModif} >Modificar turno</button>
                                            <button value={t.id} className="btn btn-danger" onClick={consultar}>Cancelar turno</button>
                                        </h5>
                                        <h6 className="card-subtitle mbr-fonts-style mb-3 display-4">
                                            <strong>Perro: {dogName}</strong> 
                                        </h6>
                                        <h6 className="card-subtitle mbr-fonts-style mb-3 display-4">
                                            <strong>Motivo: {t.motive} </strong> 
                                        </h6>
                                    </div>
                                </div>
                                {showForm && modifForm}
                            </div>
                        </div>
                    </div>
                </div>)})}
    //si no hay turnos devuelve mensaje
    else{ 
        children = (<div className="container">
            <div className="card">
                <div className="card-wrapper">
                    <div className="row align-items-center">
                        <div className="col-10 col-md">
                            <div className="card-box">
                                <h5 className=" card-title2 mbr-fonts-style m-0 mb-3 display-5">
                                    <strong>Usted no posee turnos solicitados</strong> 
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
    
    return children;
}

function MisTurnos(){
    let [showTurn, setShowTurn] = useState(false); 
    let [showForm, setShowForm] = useState(false);


    //muestra/oculta el formulario
    const muestraTurnos = () => {
        setShowTurn(!showTurn);         
    }

    //muestra los turnos del cliente
    const myTurns = (
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo" id="form7-t">
            <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={muestraTurnos}></span> 
            <div class="container">
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                        <strong>Mis Turnos</strong>
                    </h3>
                </div>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                        {turnList(showForm, setShowForm)}
                </div>
            </div>
        </section>
    )

    //tarjeta de ver turnos
    const cardMyTurns = (
        <div className="card col-12 col-md-6 col-lg-3">
            <div className="card-wrapper">
                <div className="card-box align-center">
                    <div className="iconfont-wrapper">
                        <span className="mbr-iconfont mobi-mbri-clock mobi-mbri" onClick={muestraTurnos}></span>
                    </div>
                    <h5 className="card-title mbr-fonts-style display-7"><strong>Mis turnos</strong></h5>
                    <p className="card-text mbr-fonts-style display-7">Vea o cancele sus turnos.</p>
                </div>
            </div>
        </div>
    );

    return <>{showTurn ? myTurns : cardMyTurns}</>
}

export default MisTurnos;
