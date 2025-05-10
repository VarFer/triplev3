// reloj.js
function updateClock() {
  document.getElementById("relojDisplay").textContent = new Date().toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

function actualizarReloj() {
  const ahora = new Date();
  const horaFormateada = ahora.toLocaleTimeString();
  const displayNormal = document.getElementById('relojDisplay');
  const displayFijo = document.getElementById('relojFijoDisplay');

  if (displayNormal) displayNormal.textContent = horaFormateada;
  if (displayFijo) displayFijo.textContent = horaFormateada;
}

setInterval(actualizarReloj, 1000);
actualizarReloj(); // inicializa de inmediato
