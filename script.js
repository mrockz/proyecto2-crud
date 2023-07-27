let listaEmpleados = [];

const objEmpleado = {
    id: '',
    nombre: '',
    puesto: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const puestoInput = document.querySelector('#puesto');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if (nombreInput.value === '' || puestoInput.value === '') {
        alert('Favor llenar todos los campos');
        return;
    }

    if (editando) {
        editarEmpleado();
        editando = false;
    } else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.puesto = puestoInput.value;

        agregarEmpleado();
    }
}

function agregarEmpleado() {
  listaEmpleados.push({ ...objEmpleado });

  // Guardar la lista actualizada de empleados en el localStorage
  localStorage.setItem('empleados', JSON.stringify(listaEmpleados));

  mostrarEmpleados();

  formulario.reset();
  // limpiarObjeto();
}

// Función para cargar los empleados desde el localStorage
function cargarEmpleadosDesdeLocalStorage() {
  const empleadosGuardados = localStorage.getItem('empleados');

  if (empleadosGuardados) {
    listaEmpleados = JSON.parse(empleadosGuardados);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Cargar los empleados desde el localStorage al cargar la página
  cargarEmpleadosDesdeLocalStorage();

  mostrarEmpleados();
});

function limpiarObjeto() {
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.puesto = '';
}

function mostrarEmpleados() {
    limpiarHTML();

    const divEmpleados = document.querySelector('.div-empleados');

    listaEmpleados.forEach(empleado => {
        const { id, nombre, puesto } = empleado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${puesto} - `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}

function cargarEmpleado(empleado) {
    const { id, nombre, puesto } = empleado;

    nombreInput.value = nombre;
    puestoInput.value = puesto;

    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;
}

function editarEmpleado() {
  objEmpleado.nombre = nombreInput.value;
  objEmpleado.puesto = puestoInput.value;

  const empleadoEditado = listaEmpleados.find(empleado => empleado.id === objEmpleado.id);
  if (empleadoEditado) {
    empleadoEditado.nombre = objEmpleado.nombre;
    empleadoEditado.puesto = objEmpleado.puesto;
  }

  // Guardar la lista actualizada de empleados en el localStorage
  localStorage.setItem('empleados', JSON.stringify(listaEmpleados));

  limpiarHTML();
  mostrarEmpleados();
  formulario.reset();

  formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

  editando = false;
}

function eliminarEmpleado(id) {
  listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

  // Guardar la lista actualizada de empleados en el localStorage
  localStorage.setItem('empleados', JSON.stringify(listaEmpleados));

  limpiarHTML();
  mostrarEmpleados();
}

function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while (divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }

  }
