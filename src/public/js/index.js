const socket = io();
const formIngreso = document.querySelector("#formIngreso");
const formDelete = document.querySelector("#formDelete");

formDelete.addEventListener("submit", (e) => {
    const inputId = document.querySelector("#inputId").value;
    e.preventDefault();
    socket.emit('delete', inputId);
})

formIngreso.addEventListener("submit", (e) => {
    const inputTitle = document.querySelector("#title").value;
    const inputDescription = document.querySelector("#description").value
    const inputPrice = document.querySelector("#price").value;
    const inputCategory = document.querySelector("#category").value;
    const inputCode = document.querySelector("#code").value;
    const inputStock = document.querySelector("#stock").value;
    e.preventDefault();
    const input = { 
        title : inputTitle,
        description : inputDescription,
        price : inputPrice,
        category : inputCategory,
        code : inputCode,
        stock : inputStock
    }
    socket.emit('create', input);
})

const pesoArgentino = new Intl.NumberFormat('es-Ar', {
    style: 'currency',
    currency: 'ARS',
    minimunFractionDigits: 2
});

socket.on('tabla', data => {
    const tab = document.getElementById("tab");
    tab.innerHTML = '';
    data.forEach(log=>{
        tab.innerHTML = tab.innerHTML +
        `<tr>
            <td>${log._id}</td>
            <td>${log.title}</td>
            <td>${log.description}</td>
            <td>${pesoArgentino.format(log.price)}</td>
            <td>${log.category}</td>
            <td>${log.code}</td>
            <td>${log.stock}</td>
        </tr>`;
    });
}) 