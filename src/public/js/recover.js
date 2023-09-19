const formRecover = document.querySelector(".form-recover");

function validacionRecover(emailRecover) {
    if (emailRecover === "") {
        Toast.fire({
            icon: 'error',
            title: 'Por favor inserte un email'
        })
        return false;
    }
    return true;
}

formRecover.addEventListener('submit', e => {
    e.preventDefault();
    const emailRecover = document.querySelector(".email-recover").value;
    if (validacionRecover(emailRecover)) {
        const data = new FormData(formRecover);
        const obj = {};
        data.forEach((value,key)=>obj[key]=value);
        fetch('/api/sessions/recover',{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(result=>{
            if(result.status === 200){
                Toast.fire({
                    icon: 'success',
                    title: 'Email enviado'
                })
                return window.location.replace('/login');
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Email no registrado'
                })
            }
        })
    }
})

