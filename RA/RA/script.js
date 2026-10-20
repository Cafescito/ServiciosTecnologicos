window.addEventListener('DOMContentLoaded', () => {
    alert("¡Bienvenida a AstraCode!");
    iniciarReloj();
    inicializarContadorCaracteres();
});


function iniciarReloj() {
    const header = document.querySelector('header');
    
    let relojDiv = document.getElementById('reloj-dinamico');
    if (!relojDiv) {
        relojDiv = document.createElement('div');
        relojDiv.id = 'reloj-dinamico';
        relojDiv.style.marginTop = '0.5rem';
        relojDiv.style.fontSize = '1rem';
        relojDiv.style.color = '#ff9900';
        header.appendChild(relojDiv);
    }

    setInterval(() => {
        const ahora = new Date();
        let horas = ahora.getHours();
        let minutos = ahora.getMinutes();
        let segundos = ahora.getSeconds();
        
        const ampm = horas >= 12 ? 'P.M.' : 'A.M.';
        horas = horas % 12;
        horas = horas ? horas : 12;
        
        minutos = minutos < 10 ? '0' + minutos : minutos;
        segundos = segundos < 10 ? '0' + segundos : segundos;
        
        relojDiv.textContent = `Hora actual: ${horas}:${minutos}:${segundos} ${ampm}`;
    }, 1000);
}


document.addEventListener('change', (evento) => {
    if (evento.target.tagName === 'SELECT') {
        console.log(`Elegiste esta opción: ${evento.target.value}`);
    }
});


function inicializarContadorCaracteres() {
    const descripcionInput = document.getElementById('descripcion');
    const contadorSmall = document.getElementById('contador-caracteres');
    const maxCaracteres = 250;

    if (descripcionInput && contadorSmall) {
        descripcionInput.addEventListener('input', () => {
            const caracteresActuales = descripcionInput.value.length;
            const restantes = maxCaracteres - caracteresActuales;
            contadorSmall.textContent = `Caracteres restantes: ${restantes}`;
            
            if (restantes < 20) {
                contadorSmall.style.color = '#d9534f';
            } else {
                contadorSmall.style.color = '#666';
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('form');

    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const descripcion = document.getElementById('descripcion').value.trim();

            if (nombre === '' || correo === '' || telefono === '' || descripcion === '') {
                alert('⚠️ ¡Faltan datos! Por favor llena todos los campos obligatorios.');
                return;
            }

            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexCorreo.test(correo)) {
                alert('⚠️ El formato del correo electrónico no es válido.');
                return;
            }

            const datosSolicitud = {
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                descripcion: descripcion,
                fechaRegistro: new Date().toLocaleString()
            };

            localStorage.setItem('solicitudAstraCode', JSON.stringify(datosSolicitud));

            alert(`¡Listo ${nombre}! Tu solicitud de asistencia ha sido registrada correctamente.`);

            formulario.reset();
            const contadorSmall = document.getElementById('contador-caracteres');
            if (contadorSmall) {
                contadorSmall.textContent = 'Caracteres restantes: 250';
                contadorSmall.style.color = '#666';
            }
            
            console.log("Datos guardados en LocalStorage:", datosSolicitud);
        });
    }
});