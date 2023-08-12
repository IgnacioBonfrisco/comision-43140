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

// Obtener referencia al botón de inicio
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
      mostrarMensaje("Todos los campos son obligatorios.");
      return;
    }

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

// Función para la reserva de la cancha

function reservaCancha() {
  const cancha = {
    nombre: "Cancha 1",
    horariosDisponibles: [
      { dia: "Miercoles", hora: "18:00" },
      { dia: "Miercoles", hora: "19:00" },
      { dia: "Miercoles", hora: "20:00" },
      { dia: "Miercoles", hora: "21:00" },
      { dia: "Jueves", hora: "18:00" },
      { dia: "Jueves", hora: "19:00" },
      { dia: "Jueves", hora: "20:00" },
      { dia: "Jueves", hora: "21:00" },
      { dia: "Viernes", hora: "18:00" },
      { dia: "Viernes", hora: "19:00" },
      { dia: "Viernes", hora: "20:00" },
      { dia: "Viernes", hora: "21:00" },
      { dia: "Sabado", hora: "18:00" },
      { dia: "Sabado", hora: "19:00" },
      { dia: "Sabado", hora: "20:00" },
      { dia: "Sabado", hora: "21:00" },
    ],
  };

  // Crear formulario para la reserva de cancha
  const form = document.createElement('form');
  form.innerHTML = `
    <h2>Reserva de Cancha</h2>
    <p>Horarios disponibles para la ${cancha.nombre}:</p>
  `;

  cancha.horariosDisponibles.forEach((horario, index) => {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'horario';
    input.value = index;

    const label = document.createElement('label');
    label.textContent = `${horario.dia} - ${horario.hora}`;
    label.appendChild(input);

    form.appendChild(label);
  });

  const btnReservar = document.createElement('button');
  btnReservar.type = 'submit';
  btnReservar.textContent = 'Reservar';
  form.appendChild(btnReservar);

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedOption = document.querySelector('input[name="horario"]:checked');
    if (!selectedOption) {
      mostrarMensaje("Por favor, selecciona un horario.");
      return;
    }

    const indiceHorario = parseInt(selectedOption.value);
    const horarioReserva = cancha.horariosDisponibles[indiceHorario];

    mostrarMensaje(`Has reservado la ${cancha.nombre} para el día ${horarioReserva.dia} a las ${horarioReserva.hora}`);
    mostrarMenuInicio();
  });

  // Mostrar el formulario en el contenido
  contenidoDiv.innerHTML = '';
  contenidoDiv.appendChild(form);
}
// FIN ---- Función para la reserva de la cancha

// Función para pagar la cuota de socio
function pagarCuota() {
  // Crear formulario para el pago de cuota
  const form = document.createElement('form');
  form.innerHTML = `
    <h2>Pago de Cuota</h2>
    <label>Nombre del Socio: <input type="text" id="nombreSocio" required></label>
    <label>Cantidad de Cuotas: <input type="number" id="cantidadCuotas" min="1" required></label>
    <label>Cuenta Bancaria del Dueño: <input type="text" id="cuentaDueño" required></label>
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

    mostrarMenuInicio();
  });

  // Mostrar el formulario en el contenido
  contenidoDiv.innerHTML = '';
  contenidoDiv.appendChild(form);
}

// Recuperar los datos de socios almacenados en localStorage
const storedSocios = localStorage.getItem('socios');

// Array socios
const socios = storedSocios ? JSON.parse(storedSocios) : [
  new Socio("Socio 1", 12),
  new Socio("Socio 2", 18),
  new Socio("Socio 3", 6)
];

// Declaración del objeto Dueño
const dueño = {
  nombre: "Dueño",
  cuentaBancaria: "12345"
};
// FIN ---- Función para pagar la couta de socio

// Funcion Librerias

function mostrarConfirmacion(mensaje) {
  Swal.fire({
    title: '¡Éxito!',
    text: mensaje,
    icon: 'success',
    timer: 1000,
    showConfirmButton: false
  });
}

mostrarConfirmacion(`Registro completado. ¡Bienvenido, ${socio.nombre}!`);
mostrarConfirmacion(`Has reservado la ${cancha.nombre} para el día ${horarioReserva.dia} a las ${horarioReserva.hora}`);
mostrarConfirmacion(`El socio ${nombreSocio} ha pagado ${cantidadCuotas} cuota(s) a la cuenta ${dueño.cuentaBancaria}.`);


