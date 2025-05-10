document.addEventListener("DOMContentLoaded", () => {
  // Cargar los productos desde el localStorage
  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  let productoEditadoIndex = null; // Para rastrear si estamos editando un producto

  // Función para actualizar la tabla de productos y los totales
  function actualizarTabla() {
    const tbody = document.getElementById("productTableBody");
    tbody.innerHTML = "";  // Limpiar la tabla

    let total = 0;
    productos.forEach((p, index) => {
      total += p.precio;
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${p.nombre}</td>
        <td>$${p.precio.toFixed(2)}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editarProducto(${index})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
        </td>
      `;
      tbody.appendChild(fila);
    });

    // Actualizar el total y presupuesto restante
    const presupuesto = parseFloat(document.getElementById("budget").value) || 0;
    const remaining = presupuesto - total;
    document.getElementById("totalAmount").textContent = total.toFixed(2);
    document.getElementById("remainingAmount").textContent = remaining.toFixed(2);
  }

  // Función para agregar o editar un producto
  document.getElementById("productForm").addEventListener("submit", e => {
    e.preventDefault();

    const nombre = document.getElementById("productName").value;
    const precio = parseFloat(document.getElementById("productPrice").value);

    // Validar que el nombre no esté vacío y el precio sea un número válido
    if (nombre && !isNaN(precio) && precio > 0) {
      if (productoEditadoIndex !== null) {
        // Si hay un producto siendo editado, actualizarlo
        productos[productoEditadoIndex] = { nombre, precio };
        productoEditadoIndex = null; // Resetear el índice de edición
      } else {
        // Si no, agregar un nuevo producto
        productos.push({ nombre, precio });
      }
      localStorage.setItem("productos", JSON.stringify(productos)); // Guardar en localStorage
      actualizarTabla(); // Actualizar la tabla
      e.target.reset();  // Limpiar el formulario
    } else {
      alert("Por favor ingrese un nombre y un precio válido.");
    }
  });

  // Función para editar un producto
  window.editarProducto = function (index) {
    const producto = productos[index];
    document.getElementById("productName").value = producto.nombre;
    document.getElementById("productPrice").value = producto.precio;
    productoEditadoIndex = index; // Guardar el índice del producto a editar
  }

  // Función para eliminar un producto
  window.eliminarProducto = function (index) {
    productos.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(productos)); // Actualizar en localStorage
    actualizarTabla(); // Actualizar la tabla
  }

  // Detectar cambios en el presupuesto
  document.getElementById("budget").addEventListener("input", actualizarTabla);

  // Inicializar la tabla al cargar la página
  actualizarTabla();
});
