import { useState } from 'react';

export function VeteLog(){
    const [veteLog, setVeteLog] = useState(true);
    if (Log())
        return(veteLog);
    else
        return false;
}

function Log(){
    const [log, setLog] = useState(true);
  
    return(log);
}

export function LoginBtns(){
    if (Log())
        return(
            <div className="navbar-buttons mbr-section-btn">
                <a className="btn btn-info display-4" href="index.html">Salir</a>
            </div>
        )
    else
        return (
            <div className="navbar-buttons mbr-section-btn">
                <a className="btn btn-info display-4" href="login.html">Ingresar</a>
            </div>
        )
}

export function VeteLink(){
    if (VeteLog())
        return (
            <li className="nav-item">
                <a className="nav-link link text-info text-primary display-4" href="index.html#features1-y">Veterinario</a>
            </li>
        )
}
