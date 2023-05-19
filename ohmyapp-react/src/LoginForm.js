import React, { useState } from 'react';
import { Data } from './data';

function LoginForm({ setLog, setVeter, setShowForm, handleShowForm }){

    //controla que todo esté bien y después loguea
    const handleLogin = (event) => {
        event.preventDefault();
        const datos = new FormData(event.target); //toma los datos del formulario
        const datosCompletos = Object.fromEntries(datos.entries()); //los convierte en un objeto
        
        //traer personas de la bd y chequear que el mail exista.
        const myData = Data.personas.filter(p => p.mail === datosCompletos.user); //busco en el archivo una persona que tenga ese mail
        if (myData.length == 0)
            //si no existe: 
            alert("El mail ingresado no pertenece a un usuario registrado");
        //else: chequear que el mail coincida con la contraseña
        else{
            if (myData[0].pass !== datosCompletos.pass) //si no coincide: 
                alert("la contraseña ingresada es incorrecta");
            //else: inicia la sesion y chequea si es veterinario
            else {
                if (myData[0].veter == true) //el usuario es veterinario
                    setVeter(true);
                else
                    setVeter(false);
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
                        <img src="assets/images/logo.png" />
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