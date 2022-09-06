const nombre = document.getElementById('username')
const contraseña = document.getElementById('password')
const botonLog = document.getElementById('buttonLog');
let recordar = document.getElementById("rememberMe");
let olvidar = document.getElementById("link");

Swal.fire({
    icon: 'info',
    title: 'Bienvenido!!',
    text: 'Logueate para poder acordarnos tus datos y que seas parte de nosotros!',
  })

function guardarDatos(storage){
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;

    const usuario = {
        "user": user,
        "pass": pass
    }

    if (storage === "localStorage"){
        localStorage.setItem('user', JSON.stringify(usuario));
    }

    if (storage === "sessionStorage") {
        sessionStorage.setItem('user', JSON.stringify(usuario));
    }

}

function borrarDatos(storage) {
    storage.clear();
}

function borrarDatoUnico(storage, key) {
    storage.removeItem(key);
}

botonLog.addEventListener('click', () => {
    if (recordar.checked) {
        guardarDatos('localStorage');  
    } else {
        guardarDatos('sessionStorage');
    }
})

olvidar.onclick = () => {
    Swal.fire({
        icon: 'question',
        title: 'Olvidaste la contraseña??',
        text: 'No hay problema!! Pon una nueva!!',
      })
}

