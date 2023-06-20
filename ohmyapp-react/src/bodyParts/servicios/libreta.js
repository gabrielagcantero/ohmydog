import React from "react";

function getDogs(){
    const dogs = [];

    fetch('http://localhost:3000/get-ownerdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => dogs.push(e))});
    
    return dogs;
}

let dogs = getDogs();

function Libreta({ dog }){
    let myDog = dogs.find((d => d.id === dog));
    return(
        <section data-bs-version="5.1" class="form7 cid-tCtCU4eUuo">
            <div class="container">
                <div class="mbr-section-head">
                    <h6 class="card-title mbr-fonts-style align-center mb-0 display-3">
                        <strong>Libreta sanitaria de {myDog.name}</strong>
                    </h6>
                </div>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                        <h6  className="card-title mbr-fonts-style m-0 mb-3 display-4">
                            <strong>Peso:</strong>
                        </h6>
                </div>
                <br/>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                        <h6  className="card-title mbr-fonts-style m-0 mb-3 display-4">
                            <strong>Enfermedades</strong>
                        </h6>
                </div>
                <br/>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                        <h6  className="card-title mbr-fonts-style m-0 mb-3 display-4">
                            <strong>Antiparasitario</strong>
                        </h6>
                </div>
                <br/>
                <div class="row justify-content-center mt-12" style={{marginTop: "20px"}}>
                        <h6  className="card-title mbr-fonts-style m-0 mb-3 display-4">
                            <strong>Historial de turnos</strong>
                        </h6>
                </div>
            </div>
        </section>
)}

export default Libreta;