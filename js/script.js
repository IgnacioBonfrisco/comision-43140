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

/*
async function obtenerDatosClima(diaSeleccionado, horaSeleccionada) {
  try {
    const response = await fetch('./js/db.json'); // Asegúrate de ajustar la ruta
    const datosClima = await response.json();

    const infoDia = datosClima.Clima.find(dia => dia.dia === diaSeleccionado);
    if (infoDia) {
      const horarioClima = infoDia.horarios.find(horario => horario.hora === horaSeleccionada);
      if (horarioClima) {
        return {
          temperatura: horarioClima.temperatura,
          descripcion: horarioClima.descripcion
        };
      }
    }
    return null; // Devolver null si no se encuentra información climática
  } catch (error) {
    console.error('Error al obtener los datos climáticos:', error);
    return null; // Manejar el error y devolver null
  }
}

// Función para la reserva de la cancha

async function reservaCancha() {
  const cancha = {
    nombre: "CentenarioPadelClub",
    horariosDisponibles: [
      { dia: "Lunes", hora: "10:00" },
      { dia: "Lunes", hora: "14:00" },
      { dia: "Lunes", hora: "18:00" },
      { dia: "Martes", hora: "10:00" },
      { dia: "Martes", hora: "14:00" },
      { dia: "Martes", hora: "18:00" },
      { dia: "Miercoles", hora: "10:00" },
      { dia: "Miercoles", hora: "14:00" },
      { dia: "Miercoles", hora: "18:00" },
      { dia: "Jueves", hora: "10:00" },
      { dia: "Jueves", hora: "14:00" },
      { dia: "Jueves", hora: "18:00" },
      { dia: "Viernes", hora: "10:00" },
      { dia: "Viernes", hora: "14:00" },
      { dia: "Viernes", hora: "18:00" },
      { dia: "Sabado", hora: "18:00" },
      { dia: "Sabado", hora: "19:00" },
      { dia: "Sabado", hora: "20:00" },
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
  
    form.addEventListener('submit', async function(event) {  
      event.preventDefault();
  
      const selectedOption = document.querySelector('input[name="horario"]:checked');
      if (!selectedOption) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, selecciona un horario.',
        });
        return;
      }
  
      const indiceHorario = parseInt(selectedOption.value);
      const horarioReserva = cancha.horariosDisponibles[indiceHorario];

      const diaSeleccionado = horarioReserva.dia;
      const horaSeleccionada = horarioReserva.hora;

      const datosClima = await obtenerDatosClima(diaSeleccionado, horaSeleccionada);

  if (datosClima) {
    const infoClimaDiv = document.createElement('div');
    infoClimaDiv.innerHTML = `
      <h3>Condiciones climáticas en ${cancha.nombre}:</h3>
      <p>Día: ${diaSeleccionado} - Hora: ${horaSeleccionada}</p>
      <p>Temperatura: ${datosClima.temperatura}°C</p>
      <p>Descripción: ${datosClima.descripcion}</p>
    `;
    contenidoDiv.appendChild(infoClimaDiv);
  } else {
    mostrarMensaje('No se encontraron datos climáticos para el día y la hora seleccionados.');
  }
  
      try {
        const response = await fetch(url);
        console.log(response)
        const datosClima = await response.json();
    
        const infoClima = datosClima.Clima.find(dia => dia.dia === diaSeleccionado);
        if (infoClima) {
          const horarioClima = infoClima.horarios.find(horario => horario.hora === horaSeleccionada);
          if (horarioClima) {
            const infoClimaDiv = document.createElement('div');
            infoClimaDiv.innerHTML = `
              <h3>Condiciones climáticas en ${cancha.nombre}:</h3>
              <p>Día: ${diaSeleccionado} - Hora: ${horaSeleccionada}</p>
              <p>Temperatura: ${horarioClima.temperatura}°C</p>
              <p>Descripción: ${horarioClima.descripcion}</p>
            `;
            contenidoDiv.appendChild(infoClimaDiv);
          }
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al cargar los datos climáticos.',
        });
      }
  
      Swal.fire({
        icon: 'success',
        title: '¡Reserva exitosa!',
        text: `Has reservado la ${cancha.nombre} para el día ${horarioReserva.dia} a las ${horarioReserva.hora}.`,
      });
  
      mostrarMensaje(`Has reservado la ${cancha.nombre} para el día ${horarioReserva.dia} a las ${horarioReserva.hora}`);
      mostrarMenuInicio();
    });
  
    // Mostrar el formulario en el contenido
    contenidoDiv.innerHTML = '';
    contenidoDiv.appendChild(form);
  }
*/
// FIN ---- Función para la reserva de la cancha

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

// FIN ---- Función para pagar la couta de socio




