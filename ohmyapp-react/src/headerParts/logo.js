import React from "react";

function Logo(){
    return (
    <div className="navbar-brand">
        <span className="navbar-caption-wrap">
            <a className="navbar-caption text-info text-primary display-7" href="index.html" >
                <img src="assets/images/logo.png" alt="¡Oh my dog! veterinaria" style={{height: 4 + "rem"}} />
            </a>
        </span>
    </div>
    )
}

export default Logo;