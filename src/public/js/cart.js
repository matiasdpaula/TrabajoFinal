const endShop = document.getElementsByClassName("endShop")
let carrito = window.location.pathname;
carrito = carrito.slice(7)



function clickPurchase(){
    const precio = document.getElementById("precio");
    if (precio != null) {
        Swal.fire({
            title: "Terminar compra",
            text: "Los productos en los que no haya stock no serán tenidos en cuenta al momento de realizar el ticket, ¿Desea continuar con la compra?",
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonText: "Si"
        }).then(result => {
            if (result.value) {
                fetch(`/api/carts/${carrito}/purchase`,{
                    method:'POST',
                }).then(result=>{
                    if(result.status === 200){
                        Toast.fire({
                            icon: 'success',
                            title: 'Ticket creado con exito'
                        });
                        return location.reload();
                    } else {
                        return Toast.fire({
                            icon: 'error',
                            title: 'Productos fuera de Stock o Error en la generación del ticket'
                        })
                    }
                }),
            false
            }
        });
    }
}

function clickEmpty(){
    fetch(`/api/carts/${carrito}`,{
        method:'DELETE',
    }).then(result=>{
        if(result.status === 200){
            location.reload();
        } else {
            return Toast.fire({
                icon: 'error',
                title: 'Productos fuera de Stock o Error en la generación del ticket'
            })
        }
    }), false
}

function clickContinue() {
    location.href = '/products';
}


