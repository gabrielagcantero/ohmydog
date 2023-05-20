import React from "react";

export function LoginBtns({ log, handleLog, handleShowForm }){

    const btnLogIn = <a className="btn btn-info display-4" href="login.html" onClick={handleShowForm}>Ingresar</a>;
    const btnLogOut = <a className="btn btn-info display-4" href="index.html" onClick={handleLog}>Salir</a>;


    return (
        <div className="navbar-buttons mbr-section-btn">
            {(log || localStorage.getItem("logged") === "true")? btnLogOut : btnLogIn }
        </div>
    )
}
