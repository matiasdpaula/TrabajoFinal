const formRecover = document.querySelector(".form-recover");

function validacionRecover(password , confirmPassword) {
    if (password === "" || confirmPassword === "") {
        Toast.fire({
            icon: 'error',
            title: 'Por favor inserte contraseñas'
        })
        return false;
    } else if (password === confirmPassword) {
        return true;
    }
    Toast.fire({
        icon: 'error',
        title: 'Contraseñas no coinciden'
    })
    return false;
}

formRecover.addEventListener('submit', e => {
    e.preventDefault();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const path = window.location.pathname;
    const token = path.slice(16);
    if (validacionRecover(password, confirmPassword)) {
        const data = new FormData(formRecover);
        const obj = {};
        data.forEach((value,key)=>obj[key]=value);
        fetch(`/api/sessions/changePassword/${token}`,{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(result=>{
            if(result.status === 200){
                Toast.fire({
                    icon: 'success',
                    title: 'Cambio realizado'
                })
                return window.location.replace('/login');
            } else if (result.status === 404) {
                Toast.fire({
                    icon: 'error',
                    title: 'Usuario no encontrado'
                })
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Nueva contraseña no puede ser igual a la anterior'
                })
            }
        })
    }
})
