import React from "react";

//trae el cliente logueado desde el localStorage
function getData(){return(JSON.parse(localStorage.getItem("user")))};

//muestra los datos del perfil
const miPerfil = (handleShowPerfil) => {
    let misdatos = getData();
    return (
        <section data-bs-version="5.1" className="features1 cid-tCttVg7EHo" >
            <span className="mbr-iconfont mobi-mbri-left mobi-mbri" onClick={handleShowPerfil}></span>
            <div className="container" id="miPerfil">
                <div className="row">
                    <div className="col-12 col-lg-9">
                        <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                            <strong>Mis Datos</strong>
                        </h3>
                        <h6 className="card-title2 mbr-fonts-style mb-3 display-7">
                            <strong>Nombre: {misdatos.frist_name} </strong> 
                        </h6>
                        <h6 className="card-title2 mbr-fonts-style mb-3 display-7">
                            <strong>Apellido: {misdatos.last_name} </strong> 
                        </h6>
                        <h6 className="card-title2 mbr-fonts-style mb-3 display-7">
                            <strong>Fecha de nacimiento: {(misdatos.nac).substring(0,10)} </strong> 
                        </h6>
                        <h6 className="card-title2 mbr-fonts-style mb-3 display-7">
                            <strong>Email: {misdatos.mail} </strong> 
                        </h6>
                        <h6 className="card-title2 mbr-fonts-style mb-3 display-7">
                            <strong>Teléfono: {misdatos.tel} </strong> 
                        </h6>
                    </div>
                </div>
            </div>
        </section>
    )
}
    


function Perfil({ showPerfil, handleShowPerfil }){
    return (showPerfil && miPerfil(handleShowPerfil));
}

export default Perfil;