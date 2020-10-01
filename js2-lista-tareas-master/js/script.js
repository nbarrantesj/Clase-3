//
// Lista de tareas
//

//
// MODELO
//

// Contador de tareas (para asignar un id único a cada tarea).
let contador = 0;
// Lista de tareas (Array).
let tareas = [];

const dataLocal = localStorage.getItem('tareas');

if (dataLocal) {
    tareas = JSON.parse(dataLocal);
}

console.log(tareas);

// addTask(): Agrega una tarea a la lista
function addTasks(nombreTarea, fechaTarea, completoTarea) {
    //Crea un objeto que representa la nueva tarea.
    const miTarea = {
        id: contador,
        nombre: nombreTarea,
        completo: completoTarea,
        fecha: fechaTarea,
    }

    // Agregar el objeto en el array.
    tareas.push(miTarea);

    // Incrementa el contador de tareas.
    contador++;

    // Se despliega la nueva tarea del DOM.
    appendTaskDOM(miTarea);

    localStorage.setItem('tareas', JSON.stringify(tareas));
};
//
// VISTA
//
const lista = document.getElementById('task-list');

function appendTaskDOM(tarea) {
    // Item de la lista
    const item = document.createElement('li');
    item.className = 'task-list__item';
    // Checkbox.
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', `tarea-${tarea.id}`);
    // Label.
    const label = document.createElement('label');
    label.setAttribute('for', `tarea-${tarea.id}`);
    label.innerHTML = `${tarea.nombre} - ${tarea.fecha}`;
    // Se agregan elementos.
    item.appendChild(checkbox);
    item.appendChild(label);
    lista.appendChild(item);
}

for (let i = 0; i < tareas.length; i++) {
    appendTaskDOM(tareas[i]);
}

//
// CONTROLADOR
//
// Formulario para añadir tareas.
const formulario = document.getElementById('new-task-form');

// Event handler para el evento 'submit' del formulario.
// Crea una nueva tarea.
formulario.addEventListener('submit', (event) => {
    // Se cancela el comportamiento default del formulario.
    event.preventDefault();

    // Agregar el nuevo item (modelo).
    const tarea = addTasks(formulario.elements[0].value, formulario.elements[1].value, false);

    // Reseteamos el form.
    formulario.elements[0].value = '';
    formulario.elements[1].value = '';
});