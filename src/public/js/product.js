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

document.addEventListener("click", function(event){
    if (event.target.className == "deleteProductButton"){
        const idProducto = event.target.id;
        fetch(`/api/products/${idProducto}`,{
            method:'DELETE'
        }).then(result=>{
            if(result.status === 200){
                Toast.fire({
                    icon: 'success',
                    title: 'Producto borrado con exito'
                });
                return location.reload();
            } else {
                return Toast.fire({
                    icon: 'error',
                    title: 'Ud no posee autorización para borrar este producto'
                })
            }
        })
    }
}, false); 