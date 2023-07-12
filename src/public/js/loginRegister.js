// Generales

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const datosVacios = document.getElementById("datosVacios");
const registroExitoso = document.getElementById("registroExitoso")
const mailErroneo = document.getElementById("mailErroneo")
const passErronea = document.getElementById("passErronea")
const numerosError = document.getElementById("numerosError")
const dniErroneo = document.getElementById("dniErroneo")
const usuarioNoEncontrado = document.getElementById("usuarioNoEncontrado")

// Estilo

document.getElementById("goLog").addEventListener("click", iniciarSesion);
document.getElementById("goReg").addEventListener("click", registro);
window.addEventListener("resize", anchoPagina);

const formLogin = document.querySelector(".form-login");
const formRegister = document.querySelector(".form-registro");
const contenedorForms = document.querySelector(".contenedor-forms");
const backLogin = document.querySelector(".contenedor-back-login");
const backRegister = document.querySelector(".contenedor-back-registro");

// Funciones del estilo

function anchoPagina() {
    if (window.innerWidth > 916) {
        backRegister.style.display = "block";
        backLogin.style.display = "block";
    } else {
        backRegister.style.display = "block";
        backRegister.style.opacity = "1";
        backLogin.style.display = "none";
        formLogin.style.display = "block";
        contenedorForms.style.left = "0px";
        formRegister.style.display = "none";   
    }
}

anchoPagina();

    function iniciarSesion() {
        if (window.innerWidth > 916) {
            formLogin.style.display = "block";
            contenedorForms.style.left = "10px";
            formRegister.style.display = "none";
            backRegister.style.opacity = "1";
            backLogin.style.opacity = "0";
        } else {
            formLogin.style.display = "block";
            contenedorForms.style.left = "0px";
            formRegister.style.display = "none";
            backRegister.style.display = "block";
            backLogin.style.display = "none";
        }
    }

    function registro() {
        if (window.innerWidth > 916) {
            formRegister.style.display = "block";
            contenedorForms.style.left = "410px";
            formLogin.style.display = "none";
            backRegister.style.opacity = "0";
            backLogin.style.opacity = "1";
        } else {
            formRegister.style.display = "block";
            contenedorForms.style.left = "0px";
            formLogin.style.display = "none";
            backRegister.style.display = "none";
            backLogin.style.display = "block";
            backLogin.style.opacity = "1";
        }
    }

// Validaciones

// Validaciones de Registro

// Mails

function validarMails(mailReg , cmailReg) {
    if (mailReg === cmailReg) {
        return true
    }
    Toast.fire({
        icon: 'error',
        title: 'Los E-Mails no coinciden'
    })
    return false
}

// Passwords

function passwordSeisCaracteres (passReg) {
    if (passReg.length < 6) {
        Toast.fire({
        icon: 'error',
        title: 'La contraseña debe ser mayor a seis caracteres'
    })
    return false
    }
    return true
}

function validarIgualdad(passReg , cpassReg) {
    if (passReg === cpassReg) {
        return true
    }
    Toast.fire({
        icon: 'error',
        title: 'Las contraseñas no coinciden'
    })
    return false
}

function validarPasswords(passReg , cpassReg) {
    if ((validarIgualdad(passReg , cpassReg)) && (passwordSeisCaracteres(passReg))) {
        return true
    }
    return false
}

// DNI y Edad

function validarNumeros(edadReg) {
    if ((!isNaN(edadReg))) {
        return true
    }
    Toast.fire({
        icon: 'error',
        title: 'Ingrese solo números en DNI y Edad'
    })
    return false
}

// Inputs

function validarIngresos(nameReg , apellidoReg , edadReg , mailReg , cmailReg , passReg , cpassReg) {
    if (nameReg == "" || apellidoReg == "" || edadReg == "" || mailReg == "" || cmailReg == "" || passReg == "" || cpassReg == "") {
        Toast.fire({
            icon: 'error',
            title: 'Llene todos los campos'
        })
        return false;
    }
    return true;
}

// Validaciones en conjunto

function validaciones(nameReg , apellidoReg , edadReg , mailReg , cmailReg , passReg , cpassReg) {
    if ((validarMails(mailReg , cmailReg)) && (validarNumeros(edadReg)) && (validarPasswords(passReg , cpassReg)) && (validarIngresos(nameReg , apellidoReg , edadReg , mailReg , cmailReg , passReg , cpassReg))) {
        return true
    }
    return false
}

// Eventos //

// Evento de Registro 

formRegister.addEventListener('submit', e => {
    e.preventDefault();
    let nombre = removeAccents(document.getElementById("nombreReg").value);
    let nameReg = nombre.toLowerCase();
    const apellidoReg = document.getElementById("apellidoReg").value;
    const edadReg = document.getElementById("edadReg").value;
    const mailReg = document.getElementById("mailReg").value;
    const cmailReg = document.getElementById("cmailReg").value;
    const passReg = document.getElementById("passReg").value;
    const cpassReg = document.getElementById("cpassReg").value;
    if (validaciones(nameReg , apellidoReg , edadReg , mailReg , cmailReg , passReg , cpassReg)) {
    const data = new FormData(formRegister);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/sessions/register',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>result.json()).then(json=>console.log(json));
    Toast.fire({
        icon: 'success',
        title: 'Registro Correcto'
    });
}})

// SweetAlert

const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    customClass: {
    popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
})

// Evento Login

function validacionLogin(emailLog, passLog) {
    if (emailLog === "" || passLog === "") {
        Toast.fire({
            icon: 'error',
            title: 'Usuario no encontrado'
        })
        return false;
    }
    return true;
}

formLogin.addEventListener('submit', e => {
    e.preventDefault();
    const emailLog = document.getElementById("emailLog").value;
    const passLog = document.getElementById("passLog").value;
    if (validacionLogin(emailLog, passLog)) {
        const data = new FormData(formLogin);
        const obj = {};
        data.forEach((value,key)=>obj[key]=value);
        fetch('/api/sessions/login',{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(result=>{
            if(result.status===200){
                return window.location.replace('/perfil');
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Usuario no encontrado'
                })
            }
        })
    }
})
