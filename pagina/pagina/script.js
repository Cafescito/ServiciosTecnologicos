// 1. Saludo que salta apenas carga la página
window.addEventListener('DOMContentLoaded', () => {
    alert("Bienvenida a AstraCode.");
    
    // Arrancamos el reloj en cuanto abre la página
    iniciarReloj();
});


// 2. Reloj en tiempo real (formato de 12 horas) arriba en el header
function iniciarReloj() {
    // Busco el header para poner el reloj ahí
    const header = document.querySelector('header');
    
    // Si el reloj no existe todavía, lo creo
    let relojDiv = document.getElementById('reloj-dinamico');
    if (!relojDiv) {
        relojDiv = document.createElement('div');
        relojDiv.id = 'reloj-dinamico';
        relojDiv.style.marginTop = '0.5rem';
        relojDiv.style.fontSize = '1rem';
        relojDiv.style.color = '#ff9900';
        header.appendChild(relojDiv);
    }

    // Esto hace que la hora cambie cada segundo
    setInterval(() => {
        const ahora = new Date();
        let horas = ahora.getHours();
        let minutos = ahora.getMinutes();
        let segundos = ahora.getSeconds();
        
        // Cambio a formato de 12 horas y pongo si es AM o PM
        const ampm = horas >= 12 ? 'P.M.' : 'A.M.';
        horas = horas % 12;
        horas = horas ? horas : 12;
        
        // Si los minutos o segundos son menores a 10, les pongo un cero enfrente
        minutos = minutos < 10 ? '0' + minutos : minutos;
        segundos = segundos < 10 ? '0' + segundos : segundos;
        
        relojDiv.textContent = `Hora actual: ${horas}:${minutos}:${segundos} ${ampm}`;
    }, 1000);
}


// 3. Detectar cuando el usuario elige algo en un menú desplegable (<select>)
document.addEventListener('change', (evento) => {
    if (evento.target.tagName === 'SELECT') {
        console.log(`Elegiste esta opción: ${evento.target.value}`);
    }
});


// 4. Efecto en los botones cuando paso el mouse por encima
document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('button');

    botones.forEach(boton => {
        // Cuando pongo el mouse encima
        boton.addEventListener('mouseover', () => {
            boton.style.opacity = '0.9';
        });

        // Cuando quito el mouse de encima
        boton.addEventListener('mouseleave', () => {
            boton.style.opacity = '1';
        });
    });
});


// 5, 6 y 7. Validar que el formulario no vaya vacío, avisar y guardar en la memoria del navegador
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('form');

    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            // Evito que la página se recargue sola al enviar
            e.preventDefault();

            // Saco lo que escribió el usuario en los campos
            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const telefono = document.getElementById('telefono').value.trim();

            // Reviso si falta algún campo por llenar
            if (nombre === '' || correo === '' || telefono === '') {
                alert('⚠️ ¡Faltan datos! Por favor llena todos los campos.');
                return;
            }

            // Guardo los datos en una cajita (objeto)
            const datosContacto = {
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                fechaRegistro: new Date().toLocaleString()
            };

            // Guardo la info en el LocalStorage del navegador convertida a texto
            localStorage.setItem('ultimoContactoAstraCode', JSON.stringify(datosContacto));

            // Mensaje de que todo salió bien
            alert(`¡Listo ${nombre}! Tus datos se guardaron correctamente.`);

            // Borro lo que estaba escrito en el formulario
            formulario.reset();
            
            console.log("Datos guardados en LocalStorage:", datosContacto);
        });
    }
});