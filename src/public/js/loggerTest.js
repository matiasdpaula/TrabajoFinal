function debugButton () {
    fetch("/api/products/mockingproducts",{
        method:'GET',
    }).then(result=>{
        console.log(result);
        console.log("Funciono")
    })
}

function infoButton () {
    const obj = {
    email : "adminCoder@coder.com",
    password : "adminCod3r123"
    }
    fetch('/api/sessions/login',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        if(result.status===200){
            return console.log("Funciono");
        } else {
            return console.log("No funciono");
        }
    })
}

function warnButton () {
    fetch("/api/products/478451",{
        method:'GET',
    }).then(result=>{
        console.log("Funciono")
    })
}

function errorButton () {
    const obj = {
    title : "carrito",
    description : "prueba",
    category : "Prueba de log",
    code : "123das",
    stock : "1555"
    }
    fetch('/api/products/productLoggerTest',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        return console.log("Ver consola del servidor")
    })
}; 

function fatalButton () {
    fetch("/api/products/fatal",{
        method:'GET',
    }).then(result=>{
        console.log("Funciono o no, que dilema")
    })
}
