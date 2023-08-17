class Socio {
  constructor(nombre, cuota) {
    this.nombre = nombre;
    this.cuota = cuota;
    this.cuenta = null;
  }
}

class Cuenta {
  constructor(numero, moneda) {
    this.numero = numero;
    this.moneda = moneda;
  }
}

// Referencia botón de inicio
const iniciarBtn = document.getElementById('iniciarBtn');
const mensajeDiv = document.getElementById('mensaje');
const contenidoDiv = document.getElementById('contenido');

// Agregar evento al botón para iniciar el proceso
iniciarBtn.addEventListener('click', function() {
  mostrarMensaje("Bienvenido! ¿Quieres reservar una cancha? Primero crea un usuario.");
  registroUsuario();
});

function mostrarMensaje(mensaje) {
  mensajeDiv.textContent = mensaje;
}

// Funcion registro de usuario

function registroUsuario() {
  mostrarMensaje("");

  // Crear formulario de registro de usuario
  const form = document.createElement('form');
  form.innerHTML = `
    <label>Nombre: <input type="text" id="nombre" required></label>
    <label>Apellido: <input type="text" id="apellido" required></label>
    <label>Usuario: <input type="text" id="usuario" required></label>
    <label>Contraseña: <input type="password" id="contraseña" required></label>
    <button type="submit">Registrar</button>
  `;

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;

    if (!nombre || !apellido || !usuario || !contraseña) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios.',
      });
    }
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: `Registro completado. ¡Bienvenido, ${nombre} ${apellido}!`,
    });

    // Validar que el usuario tenga letras y números;
    if (!/^[a-zA-Z0-9]+$/.test(usuario)) {
      mostrarMensaje("El usuario debe contener solo letras y números.");
      return;
    }

    // Validar que la contraseña tenga letras y números;
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(contraseña)) {
      mostrarMensaje("La contraseña debe tener al menos 6 caracteres y contener al menos una letra y un número.");
      return;
    }

    const socio = new Socio(`${nombre} ${apellido}`, 0);
    socio.cuenta = new Cuenta(12345, "$");

    socios.push(socio); // Agregar el nuevo socio al array

    // Guardar los datos del socio en localStorage
    localStorage.setItem('socios', JSON.stringify(socios));

    mostrarMensaje(`Registro completado. ¡Bienvenido, ${socio.nombre}!`);
    mostrarMenuInicio();
  });

  // Mostrar el formulario en el contenido
  contenidoDiv.innerHTML = '';
  contenidoDiv.appendChild(form);
}

// FIN ---- Funcion registro de usuario

// Función para reservar una cancha

function reservaCancha() {
  // Crear formulario para la reserva de cancha
  const form = document.createElement('form');
  form.innerHTML = `
    <h2>Reservar Cancha</h2>
    <label>Socio:</label>
    <select id="socioReserva" required>
      <option value="" disabled selected>Selecciona un socio</option>
      ${socios.map(socio => `<option value="${socio.nombre}">${socio.nombre}</option>`).join('')}
    </select>
    <label>Fecha y Hora:</label>
    <input type="datetime-local" id="fechaHora" required>
    <button type="submit">Reservar</button>
  `;

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const socioReserva = document.getElementById('socioReserva').value;
    const fechaHora = new Date(document.getElementById('fechaHora').value);

    const diaSemana = fechaHora.getDay(); 
    const hora = fechaHora.getHours();

    if (diaSemana >= 1 && diaSemana <= 5 && hora >= 18 && hora < 22) {
      const socioEncontrado = socios.find(socio => socio.nombre === socioReserva);

      if (!socioEncontrado) {
        mostrarMensaje(`El socio ${socioReserva} no existe.`);
        return;
      }
      fetch('./socios.json', {
        method: 'POST',
        body: JSON.stringify({
          to: socioEncontrado.correo,
          subject: 'Reserva de Cancha Exitosa',
          message: `Su reserva de cancha para el ${fechaHora} ha sido exitosa.`
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Mostrar SweetAlert de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Reserva Exitosa!',
        text: `La cancha ha sido reservada por ${socioReserva} el ${fechaHora}.`,
      });

      mostrarMensaje(`La cancha ha sido reservada por ${socioReserva} el ${fechaHora}.`);
      mostrarMenuInicio();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error en la Reserva',
        text: 'Las reservas solo son válidas de lunes a viernes, entre las 18:00 y las 22:00.',
      });
      mostrarMensaje("Las reservas solo son válidas de lunes a viernes, entre las 18:00 y las 22:00.");
    }
  });

  // Mostrar el formulario en el contenido
  contenidoDiv.innerHTML = '';
  contenidoDiv.appendChild(form);
}

// Función para cargar los datos de socios utilizando fetch
async function cargarDatosSocios() {
  try {
    const response = await fetch('./socios.json');
    const sociosData = await response.json();
    return sociosData;
  } catch (error) {
    console.error('Error al cargar los datos de socios:', error);
    return [];
  }
}

// Cargar los datos de socios
cargarDatosSocios().then(sociosData => {
  console.log('Datos de socios cargados:', sociosData);
});

// Función mostrar menu

function mostrarMenuInicio() {
  // Crear formulario para el menú de inicio
  const form = document.createElement('form');
  form.innerHTML = `
    <h2>Menú de Inicio</h2>
    <p>¿Qué deseas hacer?</p>
    <button type="button" id="registrarseBtn">Registrarte como Socio</button>
    <button type="button" id="reservarBtn">Reservar una Cancha</button>
    <button type="button" id="pagarBtn">Pagar la Cuota de Socio</button>
    <button type="button" id="salirBtn">Salir</button>
  `;

  form.addEventListener('click', function(event) {
    if (event.target.id === 'registrarseBtn') {
      registroUsuario();
    } else if (event.target.id === 'reservarBtn') {
      reservaCancha();
    } else if (event.target.id === 'pagarBtn') {
      pagarCuota();
    } else if (event.target.id === 'salirBtn') {
      mostrarMensaje("Has cerrado la sesión");
      volverInicio(); 
    }
  });

  // Función para volver al inicio de la página
function volverInicio() {
  window.location.href = 'index.html'; 
}

  // Mostrar el formulario en el contenido
  contenidoDiv.innerHTML = '';
  contenidoDiv.appendChild(form);
}

// FIN ---- Función mostrar menu

// Función para pagar la cuota de socio

function pagarCuota() {
  // Crear formulario para el pago de cuota
  const form = document.createElement('form');
  form.innerHTML = `
  <h2>Pago de Cuota</h2>
  <label>Nombre del Socio:</label>
  <select id="nombreSocio" required>
    <option value="" disabled selected>Selecciona un socio</option>
    ${socios.map(socio => `<option value="${socio.nombre}">${socio.nombre}</option>`).join('')}
  </select>
  <label>Cantidad de Cuotas: <input type="number" id="cantidadCuotas" min="1" required></label>
  <label>Cuenta Bancaria del Dueño:</label>
  <select id="cuentaDueño" required>
    <option value="" disabled selected>Selecciona una cuenta</option>
    <option value="${dueño.cuentaBancaria}">${dueño.cuentaBancaria}</option>
  </select>
  <button type="submit">Pagar</button>
`;

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombreSocio = document.getElementById('nombreSocio').value;
    const cantidadCuotas = parseInt(document.getElementById('cantidadCuotas').value);
    const cuentaDueño = document.getElementById('cuentaDueño').value;

    const socioEncontrado = socios.find(socio => socio.nombre === nombreSocio);

    if (!socioEncontrado) {
      mostrarMensaje(`El socio ${nombreSocio} no existe.`);
      return;
    }

    if (cantidadCuotas <= 0 || cantidadCuotas > socioEncontrado.cuota) {
      mostrarMensaje(`La cantidad de cuotas ingresada no es válida.`);
      return;
    }

    if (cuentaDueño !== dueño.cuentaBancaria) {
      mostrarMensaje(`La cuenta bancaria ingresada no coincide con la cuenta del dueño.`);
      return ;
    }

    socioEncontrado.cuota -= cantidadCuotas;
    mostrarMensaje(`El socio ${nombreSocio} ha pagado ${cantidadCuotas} cuota(s) a la cuenta ${dueño.cuentaBancaria}.`);

    Swal.fire({
      icon: 'success',
      title: '¡Pago Exitoso!',
      text: `Has pagado ${cantidadCuotas} cuota(s) con éxito.`,
    });

    mostrarMenuInicio();
  });

  // Mostrar el formulario en el contenido
  contenidoDiv.innerHTML = '';
  contenidoDiv.appendChild(form);
}
// FIN ---- Función para pagar la couta de socio

  // Definición de socios
  const socios = [
    {
      nombre: "Socio1",
      cuota: 12 
    },
    {
      nombre: "Socio2",
      cuota: 12 
    },
  
  ];
  
  // Datos del dueño
  const dueño = {
    cuentaBancaria: "12345" 
  };
  

// Recuperar los datos de socios almacenados en localStorage
const storedSocios = localStorage.getItem('socios');

const sociosAlmacenados = storedSocios ? JSON.parse(storedSocios) : [];




