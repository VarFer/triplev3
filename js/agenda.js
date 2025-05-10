document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.getElementById("contactForm");
  const contactTableBody = document.getElementById("contactTableBody");

  // Cargar los contactos desde el localStorage al cargar la página
  loadContacts();

  // Manejar el envío del formulario
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Obtener los datos del formulario
    const name = document.getElementById("contactName").value;
    const phone = document.getElementById("contactPhone").value;
    const email = document.getElementById("contactEmail").value;
    const address = document.getElementById("contactAddress").value;

    // Crear un nuevo contacto
    const contact = {
      id: Date.now(), // ID único basado en el timestamp
      name,
      phone,
      email,
      address
    };

    // Guardar el contacto en el localStorage
    saveContact(contact);

    // Limpiar el formulario
    contactForm.reset();

    // Recargar los contactos
    loadContacts();
  });

  // Función para cargar los contactos desde el localStorage
  function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contactTableBody.innerHTML = "";

    contacts.forEach(contact => {
      const row = document.createElement("tr");
      row.setAttribute("data-id", contact.id);
      
      row.innerHTML = `
        <td class="editable" data-field="name">${contact.name}</td>
        <td class="editable" data-field="phone">${contact.phone}</td>
        <td class="editable" data-field="email">${contact.email}</td>
        <td class="editable" data-field="address">${contact.address}</td>
        <td>
          <button class="btn btn-warning btn-sm edit-btn">Editar</button>
          <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>
        </td>
      `;

      // Agregar eventos de editar y eliminar
      row.querySelector(".edit-btn").addEventListener("click", () => editContact(contact.id));
      row.querySelector(".delete-btn").addEventListener("click", () => deleteContact(contact.id));

      contactTableBody.appendChild(row);
    });
  }

  // Función para guardar un contacto en localStorage
  function saveContact(contact) {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  // Función para eliminar un contacto
  function deleteContact(id) {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));

    // Recargar la lista de contactos
    loadContacts();
  }

  // Función para editar un contacto
  function editContact(id) {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    const contact = contacts.find(contact => contact.id === id);

    // Buscar las celdas de la fila
    const row = document.querySelector(`tr[data-id='${contact.id}']`);
    const editableCells = row.querySelectorAll(".editable");

    // Convertir cada celda en un input para edición
    editableCells.forEach(cell => {
      const field = cell.getAttribute("data-field");
      const value = contact[field];

      // Crear un input de texto con el valor actual
      const input = document.createElement("input");
      input.type = "text";
      input.value = value;
      input.classList.add("form-control", "form-control-sm");

      // Reemplazar el contenido de la celda por el input
      cell.innerHTML = "";
      cell.appendChild(input);
    });

    // Cambiar el botón de "Editar" por "Guardar"
    const editButton = row.querySelector(".edit-btn");
    editButton.textContent = "Guardar";
    editButton.classList.replace("btn-warning", "btn-success");

    // Cambiar el evento de "Editar" a "Guardar"
    editButton.addEventListener("click", () => saveEditContact(contact.id, row, editableCells));
  }

  // Función para guardar los cambios después de editar
  function saveEditContact(id, row, editableCells) {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    const contact = contacts.find(contact => contact.id === id);

    // Actualizar el objeto de contacto con los nuevos valores
    editableCells.forEach(cell => {
      const field = cell.getAttribute("data-field");
      const input = cell.querySelector("input");
      contact[field] = input.value; // Asignar el valor editado
    });

    // Actualizar el contacto en localStorage
    updateContactInStorage(contact);

    // Recargar la lista de contactos
    loadContacts();
  }

  // Función para actualizar un contacto en localStorage
  function updateContactInStorage(updatedContact) {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    const index = contacts.findIndex(contact => contact.id === updatedContact.id);
    contacts[index] = updatedContact;
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
});
