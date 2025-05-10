document.addEventListener("DOMContentLoaded", function () {
  const eventForm = document.getElementById("eventForm");
  const eventName = document.getElementById("eventName");
  const eventDate = document.getElementById("eventDate");
  const eventTime = document.getElementById("eventTime");
  const eventTableBody = document.getElementById("eventTableBody");

  // Almacenar los eventos en localStorage si no están vacíos
  let events = JSON.parse(localStorage.getItem("events")) || [];

  // Variable para llevar el índice del evento que estamos editando
  let editingIndex = -1;

  // Función para renderizar los eventos en la tabla
  function renderEvents() {
    eventTableBody.innerHTML = ""; // Limpiar la tabla antes de renderizar

    events.forEach((event, index) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = event.name;
      row.appendChild(nameCell);

      const dateCell = document.createElement("td");
      dateCell.textContent = event.date;
      row.appendChild(dateCell);

      const timeCell = document.createElement("td");
      timeCell.textContent = event.time;
      row.appendChild(timeCell);

      const actionCell = document.createElement("td");

      // Crear el botón de eliminar
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.classList.add("btn", "btn-danger");
      deleteButton.onclick = () => deleteEvent(index);
      actionCell.appendChild(deleteButton);

      // Crear el botón de editar
      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.classList.add("btn", "btn-warning", "ms-2");
      editButton.onclick = () => editEvent(index);
      actionCell.appendChild(editButton);

      row.appendChild(actionCell);

      eventTableBody.appendChild(row);
    });
  }

  // Función para eliminar un evento
  function deleteEvent(index) {
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events)); // Guardar los cambios en localStorage
    renderEvents(); // Volver a renderizar la tabla
  }

  // Función para editar un evento
  function editEvent(index) {
    const event = events[index];

    // Cargar los datos del evento en los campos del formulario
    eventName.value = event.name;
    eventDate.value = event.date;
    eventTime.value = event.time;

    // Cambiar el índice de edición
    editingIndex = index;

    // Cambiar el texto del botón de submit a "Actualizar"
    const submitButton = eventForm.querySelector("button");
    submitButton.textContent = "Actualizar Evento";
  }

  // Agregar o actualizar un evento
  eventForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const newEvent = {
      name: eventName.value,
      date: eventDate.value,
      time: eventTime.value,
    };

    if (editingIndex === -1) {
      // Si no estamos editando, agregar un nuevo evento
      events.push(newEvent);
    } else {
      // Si estamos editando, actualizar el evento
      events[editingIndex] = newEvent;
      editingIndex = -1; // Resetear el índice de edición
    }

    // Guardar los eventos en localStorage
    localStorage.setItem("events", JSON.stringify(events));

    // Limpiar los campos del formulario
    eventName.value = "";
    eventDate.value = "";
    eventTime.value = "";

    // Cambiar el texto del botón de submit a "Agregar Evento"
    const submitButton = eventForm.querySelector("button");
    submitButton.textContent = "Agregar Evento";

    // Volver a renderizar la tabla
    renderEvents();
  });

  // Renderizar los eventos al cargar la página
  renderEvents();
});
