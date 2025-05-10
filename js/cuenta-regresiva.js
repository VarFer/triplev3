let countdownInterval;

document.getElementById("startCountdown").addEventListener("click", iniciarCuentaRegresiva);
document.getElementById("targetTime").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();  // Evitar que se envíe un formulario si el input está en uno
    iniciarCuentaRegresiva();
  }
});

function iniciarCuentaRegresiva() {
  const input = document.getElementById("targetTime").value;
  if (!input) return;

  const [hours, minutes] = input.split(":").map(Number);
  const now = new Date();
  const target = new Date();

  target.setHours(hours, minutes, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1); // Suma un día si ya pasó

  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const now = new Date();
    const diffSeconds = Math.floor((target - now) / 1000);

    if (diffSeconds <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("countdownDisplay").textContent = "¡Hora de salir!";
      const sound = document.getElementById("countdownSound");
      sound?.play().catch(err => console.warn("No se pudo reproducir el sonido:", err));
    } else {
      const hrs = Math.floor(diffSeconds / 3600);
      const mins = Math.floor((diffSeconds % 3600) / 60);
      const secs = diffSeconds % 60;
      document.getElementById("countdownDisplay").textContent =
        `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    }
  }, 1000);
}

function pad(num) {
  return num < 10 ? "0" + num : num;
}
