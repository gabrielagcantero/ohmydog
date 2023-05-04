

function iniciarSesion(){

    const email = document.getElementById("name-form7-t").value;
    const pass = document.getElementById("pass-form7-t").value;

    alert(email);
    alert(pass);
    let userActivo = buscarperosona(email);


    if(userActivo.veterinario ){
        //guardar clave'user' y su clave primaria en el local storage
        localStorage.setItem('activo', userActivo);
    }

    console.log(email);
    console.log(localStorage.getItem('activo'));
    let user = localStorage.getItem('activo').veterinario;
}

