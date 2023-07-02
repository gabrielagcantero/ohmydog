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

//manda vacuna a la BD (de los dos tipos)
function exportVacun(dog_con){
    if (JSON.parse(dog_con).nombre)
    
    fetch('http://localhost:3000/store-vacuna', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: dog_con
    }).then(function(response) {
        return response.json();
    });
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
        alert("faltan los datos de la cantidad de antiparasitario aplicado");
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

//castracion a la BD
function exportCastracion(dog_con){
    if (JSON.parse(dog_con).castrado === "Sí")
    fetch('http://localhost:3000/castrar-dog', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: dog_con
    }).then(function(response) {
        return response.json();
    });
}

//consulta a la BD
function exportConsulta(dog_con){
    //actualiza peso
    fetch('http://localhost:3000/consulta-dog', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: dog_con
    }).then(function(response) {
        return response.json();
    });

    //actualiza enfermedades
    if (JSON.parse(dog_con).enf){
        fetch('http://localhost:3000/store-enfermedad', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: dog_con
        }).then(function(response) {
            return response.json();
        });
    }
}
    
//carga el reporte del turno
    function send(event){
    //agarro datos del formulario, creo el objeto
    let datos = new FormData(event.target);
    let datosCompletos = Object.fromEntries(datos.entries());
    
    //agrego el tipo de vacuna si es necesario
    if (datosCompletos.motive === "Vacuna tipo A"){
        datosCompletos.tipo = "A";
        datosCompletos.motive = "Vacuna";
    } else if (datosCompletos.motive === "Vacuna tipo B"){
        if (datosCompletos.vacunado === "Sí"){
            datosCompletos.tipo = "B";
            datosCompletos.nombre = "Antirrábica";
            datosCompletos.dosis = "-";
        }
        datosCompletos.motive = "Vacuna";
    }

    let dog_con = JSON.stringify(datosCompletos); //Jsonifico
    
    //los mando donde corresponda
    switch (datosCompletos.motive){
        case "Consulta": 
            exportConsulta(dog_con);
            break;
        case "Castración":
            exportCastracion(dog_con);
            break;
        case "Vacuna":
            exportVacun(dog_con);
            break;

        default:
          alert("Opción no válida");
      }
    //guarda observaciones
    fetch('http://localhost:3000/store-obs', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: dog_con
    }).then(function(response) {
        return response.json();
    });
 
    //pone el turno como atendido
    fetch('http://localhost:3000/attended-turn', {
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

function consultar(event){
    event.preventDefault();
    window.confirm("La información será enviada a la libreta sanitaria del perro.") && send(event);
}

const consulta = (peso, setPeso) => {
    const handleChange = (event) => {
        setPeso(parseFloat(event.target.value)); // Actualizar el valor cuando cambie el input
    };

    return(
        <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
            <label for="peso">Peso en kilos:</label><br/>
            <input type="number" step="0.1" className="form-control" name="peso" placeholder={peso} value={peso} onChange={handleChange} required/><br/>
            <label for="enf">Enfermedad encontrada:</label><br/>
            <input className="form-control" name="enf" placeholder="Dejar en blanco si no se encontró ninguna enfermedad" pattern="[A-Za-z ]{1,50}"/>
        </div>
)};

const castracion = (
    <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
        <label >El perro fue castrado?:</label><br/>
        <input type="radio" name="castrado" value="Sí" />
        <label for="opcion1">Sí</label><br></br>
        <input type="radio" name="castrado" value="No" />
        <label for="opcion1">No</label><br></br>
    </div>
);

const vacunaA = (
    <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
        <label >Ingrese la vacuna aplicada:</label><br/>
        <input className="form-control" name="nombre" pattern="[A-Za-z ]{0,50}" placeholder="Nombre"/><br/>
        <input className="form-control" name="dosis" placeholder="Dosis"/>
    </div>
);

const vacunaB = (
    <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
        <label >Se aplicó la vacuna antirrábica?:</label><br/>
        <input type="radio" name="vacunado" value="Sí" />
        <label for="opcion1">Sí</label><br></br>
        <input type="radio" name="vacunado" value="No" />
        <label for="opcion1">No</label><br></br>
    </div>
);


//define qué formulario mostrar
//formulario para adoptar perro
function Reportes ({ id, setShowForm }){
    const ocultarForm = () => {setShowForm(null)};

    let myturn = turns.find((t) => t.id === id);
    let myDog = dogs.find((d) => d.id === myturn.dog);
    const [peso, setPeso] = useState(myDog.peso);
    
    return (
    <section data-bs-version="5.1" className="form7 cid-tCtCU4eUuo">
        <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={ocultarForm} ></span> 
        <div className="container">
            <div className="mbr-section-head">
                <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                    <strong>Carga de reporte de turno</strong>
                </h3>
            </div>
            <div className="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                <div className="col-lg-12 mx-auto mbr-form">
                    <form onSubmit={consultar} className="mbr-form form-with-styler mx-auto">
                        <div>   
                            {myturn.motive === "Consulta" && consulta(peso, setPeso)}
                            {myturn.motive === "Castración" && castracion}
                            {myturn.motive === "Vacuna tipo A" && vacunaA}
                            {myturn.motive === "Vacuna tipo B" && vacunaB}
                            <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                <label for="obs">Observaciones:</label><br/>
                                <textarea name="obs" rows="5" class="form-control"></textarea>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3" >
                                <input name="id_turno" type="hidden" value={id} />
                                <input name="id_perro" type="hidden" value={myturn.dog} />
                                <input name="motive" type="hidden" value={myturn.motive} />
                                <input name="fecha" type="hidden" value={myturn.day.substring(0,10)} />
                            </div>
                            <div className="col-auto mbr-section-btn align-center">
                                <button type="submit" class="btn btn-info display-4"  style={{width: "50%", margin: "auto"}}>Enviar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    )};

export default Reportes;

