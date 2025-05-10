// Lista de ciudades (nombre para mostrar + zona horaria)
const ciudades = [
  { nombre: "Santiago", zona: "America/Santiago" },
  { nombre: "Nueva York", zona: "America/New_York" },
  { nombre: "Madrid", zona: "Europe/Madrid" },
  { nombre: "Tokio", zona: "Asia/Tokyo" },
  { nombre: "Sídney", zona: "Australia/Sydney" },
  { nombre: "Londres", zona: "Europe/London" },
  { nombre: "Seúl", zona: "Asia/Seoul" },
  { nombre: "Los Ángeles", zona: "America/Los_Angeles" },
  { nombre: "Chicago", zona: "America/Chicago" },
  { nombre: "París", zona: "Europe/Paris" },
  { nombre: "Hong Kong", zona: "Asia/Hong_Kong" },
  { nombre: "Toronto", zona: "America/Toronto" },
  { nombre: "Johannesburgo", zona: "Africa/Johannesburg" },
  { nombre: "Dubái", zona: "Asia/Dubai" },
  { nombre: "Calcuta", zona: "Asia/Kolkata" },
  { nombre: "CDMX", zona: "America/Mexico_City" },
  { nombre: "Berlín", zona: "Europe/Berlin" },
  { nombre: "Buenos Aires", zona: "America/Buenos_Aires" },
  { nombre: "Manila", zona: "Asia/Manila" },
  { nombre: "Brisbane", zona: "Australia/Brisbane" }
];

// Llenar el select con las ciudades
function cargarCiudades() {
  const select = document.getElementById("ciudad");
  ciudades.forEach(c => {
    const option = document.createElement("option");
    option.value = c.zona;
    option.textContent = c.nombre;
    select.appendChild(option);
  });
}

// Obtener la hora en una zona horaria específica
function obtenerHoraActual(zona) {
  try {
    return new Date().toLocaleTimeString("es-CL", { timeZone: zona });
  } catch (e) {
    console.error(e);
    return "Zona horaria no válida.";
  }
}

// Mostrar la hora al usuario
function mostrarHora() {
  const zona = document.getElementById("ciudad").value;
  if (!zona) {
    document.getElementById("horaCiudad").textContent = "Por favor, selecciona una ciudad.";
    return;
  }
  
  const hora = obtenerHoraActual(zona);
  document.getElementById("horaCiudad").textContent = `Hora actual: ${hora}`;
}

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function() {
  cargarCiudades(); // Cargar las ciudades
});
