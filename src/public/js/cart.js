const endShop = document.getElementsByClassName("endShop")
let carrito = window.location.pathname;
carrito = carrito.slice(7)

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

function clickPurchase(){
        fetch(`/api/carts/${carrito}/purchase`,{
            method:'POST',
        }).then(result=>{
            if(result.status===200){
                return Toast.fire({
                    icon: 'success',
                    title: 'Ticket creado con exito'
                });
            } else {
                return Toast.fire({
                    icon: 'error',
                    title: 'Productos fuera de Stock o Error en la generación del ticket'
                })
            }
        }),
    false
}

function clickEmpty(){
    fetch(`/api/carts/${carrito}`,{
        method:'DELETE',
    }).then(result=>{
        if(result.status===200){
            location.reload();
        } else {
            return Toast.fire({
                icon: 'error',
                title: 'Productos fuera de Stock o Error en la generación del ticket'
            })
        }
    }), false}




