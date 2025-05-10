// ========== CRONÓMETRO (cuenta ascendente) ==========
let cronoSegundos = 0;
let cronoIntervalo;
let cronoActivo = false;

function formatoTiempo(segundos) {
  const min = String(Math.floor(segundos / 60)).padStart(2, '0');
  const seg = String(segundos % 60).padStart(2, '0');
  return `${min}:${seg}`;
}

function iniciarCronometro() {
  if (cronoActivo) return;
  cronoActivo = true;
  cronoIntervalo = setInterval(() => {
    cronoSegundos++;
    document.getElementById('cronometroDisplay').textContent = formatoTiempo(cronoSegundos);
  }, 1000);
}

function pausarCronometro() {
  clearInterval(cronoIntervalo);
  cronoActivo = false;
}

function reiniciarCronometro() {
  clearInterval(cronoIntervalo);
  cronoSegundos = 0;
  cronoActivo = false;
  document.getElementById('cronometroDisplay').textContent = '00:00';
}

// ========== TEMPORIZADOR (cuenta regresiva) ==========
let tiempoRestante = 0;
let temporizador;
let temporizadorActivo = false;
const audioAlarma = new Audio('assets/audio/Bleep-SoundBible.com-1927126940.mp3'); // Ruta de sonido

function iniciarTemporizador() {
  if (temporizadorActivo) return;

  const min = parseInt(document.getElementById('minutos').value) || 0;
  const seg = parseInt(document.getElementById('segundos').value) || 0;
  tiempoRestante = min * 60 + seg;

  if (tiempoRestante <= 0) return;

  temporizadorActivo = true;
  actualizarTemporizador();

  temporizador = setInterval(() => {
    tiempoRestante--;
    actualizarTemporizador();
    if (tiempoRestante <= 0) {
      clearInterval(temporizador);
      temporizadorActivo = false;
      audioAlarma.play();
      alert("¡Tiempo finalizado!");
    }
  }, 1000);
}

function actualizarTemporizador() {
  document.getElementById('temporizadorDisplay').textContent = formatoTiempo(tiempoRestante);
}

function pausarTemporizador() {
  clearInterval(temporizador);
  temporizadorActivo = false;
}

function reiniciarTemporizador() {
  clearInterval(temporizador);
  tiempoRestante = 0;
  temporizadorActivo = false;
  actualizarTemporizador();
}

// ========== EVENTOS ==========
document.addEventListener("DOMContentLoaded", () => {
  // Cronómetro
  document.getElementById('startCronometro')?.addEventListener('click', iniciarCronometro);
  document.getElementById('pauseCronometro')?.addEventListener('click', pausarCronometro);
  document.getElementById('resetCronometro')?.addEventListener('click', reiniciarCronometro);

  // Temporizador
  document.getElementById('startTemporizador')?.addEventListener('click', iniciarTemporizador);
  document.getElementById('pauseTemporizador')?.addEventListener('click', pausarTemporizador);
  document.getElementById('resetTemporizador')?.addEventListener('click', reiniciarTemporizador);
});
