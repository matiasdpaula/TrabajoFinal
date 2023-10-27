document.addEventListener("click", function(event){
    if (event.target.name == "delete-user"){
        const userEmail = event.target.id;
        const obj = {
            email : userEmail
        }
        fetch('/api/users/deleteUser',{
            method:'DELETE',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(result=>{
            if(result.status === 200){
                Toast.fire({
                    icon: 'success',
                    title: 'Usuario borrado con exito'
                });
                return location.reload();
            }
            else {
                return Toast.fire({
                    icon: 'error',
                    title: 'Error'
                })
            }
        })
    }
}, false);

document.addEventListener("click", function(event){
    if (event.target.name == "modificar-rol"){
        const userId = event.target.id;
        fetch(`/api/users/adminUpdate/${userId}`,{
            method:'PUT'
        }).then(result=>{
            if(result.status === 200){
                Toast.fire({
                    icon: 'success',
                    title: 'Rol actualizado con exito'
                });
                return location.reload();
            } else {
                return Toast.fire({
                    icon: 'error',
                    title: 'Error'
                })
            }
        })
    }
}, false);