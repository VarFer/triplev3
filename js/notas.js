document.addEventListener("DOMContentLoaded", () => {
    // Cargar las notas desde el localStorage
    const notes = JSON.parse(localStorage.getItem("notas")) || [];
    const notesList = document.getElementById("notesList");

    // Renderizar las notas
    function renderNotes() {
        notesList.innerHTML = "";  // Limpiar la lista antes de renderizar
        notes.forEach((note, index) => {
            const item = document.createElement("div");
            item.classList.add("col");

            // Agregar la clase 'note-card' para aplicar el estilo azul y amarillo
            item.innerHTML = `
                <div class="note-card p-3">
                    <strong>${note.title}</strong><br>
                    ${note.content}<br>
                    <small>Creada el: ${note.createdAt}</small>  <!-- Mostrar la fecha de creación -->
                    <div>
                        <button class="btn btn-warning btn-sm" onclick="editNote(${index})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteNote(${index})">Eliminar</button>
                    </div>
                </div>
            `;
            notesList.appendChild(item);
        });
    }

    // Manejar el envío del formulario de notas
    document.getElementById("noteForm").addEventListener("submit", function (e) {
        e.preventDefault();  // Evitar que la página se recargue

        const title = document.getElementById("noteTitle").value;
        const content = document.getElementById("noteContent").value;
        const createdAt = new Date().toLocaleString();  // Fecha y hora actuales

        // Si hay título y contenido, agregar la nueva nota
        if (title && content) {
            notes.push({ title, content, createdAt });
            localStorage.setItem("notas", JSON.stringify(notes)); // Guardar en el localStorage
            renderNotes(); // Volver a renderizar la lista de notas
        }

        e.target.reset();  // Limpiar el formulario
    });

    // Eliminar una nota
    window.deleteNote = function (index) {
        notes.splice(index, 1);  // Eliminar la nota del arreglo
        localStorage.setItem("notas", JSON.stringify(notes)); // Actualizar en el localStorage
        renderNotes(); // Volver a renderizar las notas
    };

    // Editar una nota
    window.editNote = function (index) {
        const note = notes[index];
        document.getElementById("noteTitle").value = note.title;
        document.getElementById("noteContent").value = note.content;

        // Eliminar la nota antes de editarla
        deleteNote(index);
    };

    // Renderizar las notas al inicio
    renderNotes(); // Llamar a renderNotes para asegurarse de que las notas se muestren cuando se carga la página

});
