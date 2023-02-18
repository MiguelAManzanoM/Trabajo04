// Se hace la conexión con el servidor
var socketFront = io.connect('http://localhost:4000');

// Variables del html
var mensaje = document.getElementById('mensaje'),
    remitente = document.getElementById('remitente'),
    botonEnviar = document.getElementById('enviar'),
    salida = document.getElementById('output'),
    descripcion = document.getElementById('feedback');

// Emitir eventos
botonEnviar.addEventListener('click', function(){
    if(mensaje.value != '')
    {
        if(remitente.value == '')
        {
            remitente.value = 'Anónimo';
        }
        socketFront.emit('chat', {
            mensaje: mensaje.value,
            remitente: remitente.value
        });
        mensaje.value = "";
    }
});

mensaje.addEventListener('keypress', function(){
    if(remitente.value == '')
    {
        remitente.value = 'Anónimo';
    }
    socketFront.emit('typing', remitente.value);
});

// Escuchar eventos
socketFront.on('chat', function(data){
    descripcion.innerHTML = '';
    salida.innerHTML += '<p><strong>' + data.remitente + ': </strong>' + data.mensaje + '</p>';
});

socketFront.on('typing', function(data){
    descripcion.innerHTML = '<p><em>' + data + ' está escribiendo...</em></p>';
});
