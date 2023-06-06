const socket = io();
const formIngreso = document.getElementById("formIngreso");
const input = document.getElementsById("title")

formIngreso.addEventListener("submit", (e) => {
    e.preventDefault();
    if( input.value ) {
        socket.emit('chat', input.value);
        input.value = "";
    }
})

