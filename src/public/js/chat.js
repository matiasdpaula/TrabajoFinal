const socket = io();
let user;
let chatBox = document.getElementById("chatBox");

Swal.fire({
    title:"Ingresa un Email",
    input:"email",
    text:"Ingresa un email para identificarte en el chat",
    inputValidator: (value) => {
        return !value && 'Ingresa un mail para poder continuar'
    },
    allowOutsideClick:false
}).then(result => {
    user=result.value
});

chatBox.addEventListener("keyup" , evt =>{
    if(evt.key === "Enter") {
        if(chatBox.value.trim().length>0) {
            socket.emit("message", {user:user , message:chatBox.value});
            chatBox.value="";
        }
    }
})

socket.on('messageLogs', data =>{
    let log = document.getElementById('messageLogs');
    let messages = "";
    data.forEach(message => {
        messages = messages+`${message.user} dice: ${message.message}</br>`
    })
    log.innerHTML = messages;
})




