import React, { useState } from 'react';

export function LoginBtns({ log, handleLog, handleShowForm }){

    const btnLogIn = <a className="btn btn-info display-4" href="login.html" onClick={handleShowForm}>Ingresar</a>;
    const btnLogOut = <a className="btn btn-info display-4" href="index.html" onClick={handleLog}>Salir</a>;


    return (
        <div className="navbar-buttons mbr-section-btn">
            {log? btnLogOut : btnLogIn }
        </div>
    )
}

export function VeteLink(){
    if (localStorage.getItem("veteLog") === true)
        return (
            <li className="nav-item">
                <a className="nav-link link text-info text-primary display-4" href="index.html#features1-y">Veterinario</a>
            </li>
        )
}
