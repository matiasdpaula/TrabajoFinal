const carrito = document.getElementById("carrito").innerText;

document.addEventListener("click", function(event){
    if (event.target.className == "addToCartButton"){
        const idProducto = event.target.id;
        const obj = {
            cart : carrito,
            product : idProducto
        }
        fetch('/api/carts/addToCart',{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(result=>{
            if(result.status===201){
                return Toast.fire({
                    icon: 'success',
                    title: 'Producto agregado con exito'
                });
            } else {
                return Toast.fire({
                    icon: 'error',
                    title: 'Error'
                })
            }
        })
    }
}, false); 