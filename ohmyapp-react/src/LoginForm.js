import React from "react";

//trae los clientes registrados
function getClients(){
    const clients= [];

    fetch('http://localhost:3000/get-clientdata')
        .then((response) => response.json())
        .then((results) => {results.map((e) => clients.push(e));
        });

    return clients;
}

let clients = getClients();

function LoginForm({ setLog, setVeter, setShowForm, handleShowForm }){

    //controla que todo esté bien y después loguea
    const handleLogin = (event) => {
        event.preventDefault();
        const datos = new FormData(event.target); //toma los datos del formulario
        const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto
        
        //chequear que el mail exista.
        if (clients.filter((c) => c.mail === datosCompletos.user).length === 0)
            //si no existe: 
            alert("El mail ingresado no pertenece a un usuario registrado");
        //else: chequear que el mail coincida con la contraseña
        else{
            if (clients.filter((c) => c.mail === datosCompletos.user)[0].pass !== datosCompletos.pass) //si no coincide: 
                alert("la contraseña ingresada es incorrecta");
            //else: inicia la sesion y chequea si es veterinario
            else {
                if (clients.filter((c) => c.mail === datosCompletos.user)[0].veter === 1) {//el usuario es veterinario
                    setVeter(true);
                    localStorage.setItem("veter", "true");
                }
                else {
                    setVeter(false);
                    localStorage.setItem("veter", "false");
                }
                
                localStorage.setItem("logged", "true");
                //guardo el usuario actual en localStorage
                localStorage.setItem("user", JSON.stringify(clients.filter((c) => c.mail === datosCompletos.user)[0]));
                alert("sesion iniciada correctamente");
                setLog(true);
                setShowForm(false);
            }
        }
    }

    //formulario de login
    const form = (
        <section data-bs-version="5.1" className="form7 cid-tCtCU4eUuo">
            <div className="container">
                <div className="row justify-content-center mt-4">
                    <div className="col-lg-8 mx-auto mbr-form" data-form-type="formoid">
                        <form onSubmit={handleLogin}className="mbr-form form-with-styler mx-auto" data-form-title="Form login"> 
                        <img src="assets/images/logo.png" alt="logo" />
                        <br />
                        <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                            <strong>Ingreso</strong>
                        </h3>
                        <br/>
                        <div className="dragArea row">
                            <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3">
                                <input type="email" name="user" placeholder="Usuario" className="form-control" required />
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-3">
                                <input type="password" name="pass" placeholder="Contraseña" className="form-control" required/>
                            </div>
                            <div className="col-auto mbr-section-btn align-center">
                                <button type="submit" className="btn btn-info display-4">Enviar</button>
                                <button type="button" className="btn btn-link" onClick={handleShowForm}>Cancelar</button>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )

    return form;
}
export default LoginForm;