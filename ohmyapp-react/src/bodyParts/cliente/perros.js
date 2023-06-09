import React from "react";

const cardDogs = (
    <div className="card col-12 col-md-6 col-lg-3">
        <div className="card-wrapper">
            <div className="card-box align-center">
                <div className="iconfont-wrapper">
                    <span className="mbr-iconfont mobi-mbri-hearth mobi-mbri"></span>
                </div>
                <h5 className="card-title mbr-fonts-style display-7"><strong>Mis Perros</strong></h5>
                <p className="card-text mbr-fonts-style display-7">Vea qué perros tiene registrados.</p>
            </div>
        </div>
    </div>
)

function Perros(){
    return cardDogs
}

export default Perros;