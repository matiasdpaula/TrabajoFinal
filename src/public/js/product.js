document.addEventListener("click", function(event){
    if (event.target.className == "addToCartButton"){
        const target = event.target;
        const idProducto = event.target.id;
        fetch(`http://localhost:8080/api/carts/addToCart/${idProducto}`,{method : "POST"})
    }
}, false); 

