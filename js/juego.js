document.addEventListener("DOMContentLoaded", () => {
  let score = 0;
  let correctType = "";
  let timer;
  let timeLeft = 180;
  let operationTimeLeft = 30; // Tiempo para completar cada operación
  let balloonSpeed = 1; // Velocidad inicial de los globos
  const balloonArea = document.getElementById("balloonArea");
  const scoreDisplay = document.getElementById("score");
  const gameInfo = document.getElementById("gameInfo");
  const countdownDisplay = document.getElementById("countdownDisplay");

  const operationDisplay = document.createElement("div");
  operationDisplay.id = "operationDisplay";
  operationDisplay.style.marginTop = "10px";
  operationDisplay.style.fontWeight = "bold";
  gameInfo.insertAdjacentElement("afterend", operationDisplay);

  const resultadoOperacion = document.createElement("div");
  resultadoOperacion.id = "resultadoOperacion";
  resultadoOperacion.style.marginTop = "5px";
  resultadoOperacion.style.fontStyle = "italic";
  operationDisplay.insertAdjacentElement("afterend", resultadoOperacion);

  const coloresChoque = ["#FF9800", "#2196F3", "#9C27B0", "#3F51B5", "#009688", "#E91E63"];

  // Función para generar una operación aleatoria
  function generarOperacion() {
    const operaciones = [
      () => {
        const a = Math.floor(Math.random() * 20) + 1;
        const b = Math.floor(Math.random() * 20) + 1;
        return { texto: `${a} + ${b} = ?`, resultado: a + b, completa: `${a} + ${b} = ${a + b}` };
      },
      () => {
        const a = Math.floor(Math.random() * 50) + 10;
        const b = Math.floor(Math.random() * 10) + 1;
        return { texto: `${a} - ${b} = ?`, resultado: a - b, completa: `${a} - ${b} = ${a - b}` };
      },
      () => {
        const a = Math.floor(Math.random() * 10) + 2;
        const b = Math.floor(Math.random() * 10) + 2;
        return { texto: `${a} * ${b} = ?`, resultado: a * b, completa: `${a} * ${b} = ${a * b}` };
      },
      () => {
        const b = Math.floor(Math.random() * 9) + 2;
        const res = Math.floor(Math.random() * 10) + 2;
        const a = b * res;
        return { texto: `${a} / ${b} = ?`, resultado: res, completa: `${a} / ${b} = ${res}` };
      }
    ];
    return operaciones[Math.floor(Math.random() * operaciones.length)]();
  }

  // Función para crear los globos con las operaciones
  function createBalloon(resultado, operacionCompleta) {
    const balloon = document.createElement("div");
    balloon.textContent = resultado;
    balloon.classList.add("balloon", resultado % 2 === 0 ? "even" : "odd");

    const size = 60;
    const xPos = Math.random() * (balloonArea.offsetWidth - size);
    const yPos = Math.random() * (balloonArea.offsetHeight - size);
    balloon.style.left = `${xPos}px`;
    balloon.style.top = `${yPos}px`;
    balloonArea.appendChild(balloon);

    let speedX = (Math.random() * balloonSpeed + 0.5) * (Math.random() < 0.5 ? -1 : 1);
    let speedY = (Math.random() * balloonSpeed + 0.5) * (Math.random() < 0.5 ? -1 : 1);

    // Mueve el globo
    function moveBalloon() {
      const containerRect = balloonArea.getBoundingClientRect();
      const balloonRect = balloon.getBoundingClientRect();

      let nextLeft = balloon.offsetLeft + speedX;
      let nextTop = balloon.offsetTop + speedY;

      // Rebote horizontal
      if (nextLeft <= 0 || nextLeft + size >= balloonArea.clientWidth) {
        speedX *= -1;
        balloon.style.backgroundColor = coloresChoque[Math.floor(Math.random() * coloresChoque.length)];
      }

      // Rebote vertical
      if (nextTop <= 0 || nextTop + size >= balloonArea.clientHeight) {
        speedY *= -1;
        balloon.style.backgroundColor = coloresChoque[Math.floor(Math.random() * coloresChoque.length)];
      }

      balloon.style.left = `${balloon.offsetLeft + speedX}px`;
      balloon.style.top = `${balloon.offsetTop + speedY}px`;

      requestAnimationFrame(moveBalloon);
    }

    moveBalloon();

    setTimeout(() => {
      balloon.remove();
      resultadoOperacion.textContent = `Resultado: ${operacionCompleta}`;
    }, 12000);

    balloon.addEventListener("click", () => {
      // Animación de explosión del globo
      balloon.style.transform = "scale(1.5)";
      balloon.style.transition = "transform 0.3s ease-in-out";
      setTimeout(() => {
        balloon.remove();
      }, 300);

      // Comprobación de la respuesta
      if ((correctType === "par" && resultado % 2 === 0) || (correctType === "impar" && resultado % 2 !== 0)) {
        score += resultado;
        gameInfo.textContent = "¡Correcto!";
      } else {
        score -= resultado;
        gameInfo.textContent = "¡Incorrecto!";
      }
      scoreDisplay.textContent = score;
      resultadoOperacion.textContent = `Resultado: ${operacionCompleta}`;
    });
  }

  // Función para establecer el tipo de número correcto y generar la operación
  function setCorrectTypeYOperacion() {
    correctType = Math.random() < 0.5 ? "par" : "impar";
    gameInfo.textContent = `¡Haz clic en ${correctType}s!`;

    const { texto, resultado, completa } = generarOperacion();
    operationDisplay.textContent = texto;

    createBalloon(resultado, completa);
    createBalloon(resultado, completa);
  }

  // Función para actualizar el contador de tiempo
  function updateCountdown() {
    if (timeLeft <= 0) {
      clearInterval(timer);
      balloonArea.innerHTML = '';
      gameInfo.textContent = '¡Se acabó el tiempo!';
      showEndScreen();
    } else {
      countdownDisplay.textContent = `Tiempo: ${timeLeft}s`;
      if (timeLeft <= 3) {
        countdownDisplay.style.color = "red";
      }
      timeLeft--;
    }

    if (timeLeft % 30 === 0 && balloonSpeed < 3) {
      balloonSpeed += 0.5; // Aumenta la velocidad de los globos
    }
  }

  // Función para mostrar la pantalla de fin de juego
  function showEndScreen() {
    const endScreen = document.createElement("div");
    endScreen.id = "endScreen";
    endScreen.style.position = "absolute";
    endScreen.style.top = "50%";
    endScreen.style.left = "50%";
    endScreen.style.transform = "translate(-50%, -50%)";
    endScreen.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    endScreen.style.padding = "20px";
    endScreen.style.color = "white";
    endScreen.style.textAlign = "center";
    endScreen.innerHTML = `
      <h1>¡Juego Terminado!</h1>
      <p>Tu puntaje final es: ${score}</p>
      <button id="restartButton">Reiniciar</button>
    `;
    document.body.appendChild(endScreen);

    document.getElementById("restartButton").addEventListener("click", resetGame);
  }

  // Función para reiniciar el juego
  function resetGame() {
    score = 0;
    timeLeft = 180;
    balloonSpeed = 1;
    scoreDisplay.textContent = score;
    countdownDisplay.style.color = "black";
    countdownDisplay.textContent = `Tiempo: ${timeLeft}s`;
    balloonArea.innerHTML = '';
    const endScreen = document.getElementById("endScreen");
    if (endScreen) endScreen.remove();
    setCorrectTypeYOperacion();
    timer = setInterval(updateCountdown, 1000);
  }

  // Inicia el juego al hacer clic en el área de los globos
  balloonArea.addEventListener("click", () => {
    if (!timer) {
      resetGame();
    }
  });

  // Establece las operaciones y el tipo correcto de número a cada 1.5 segundos
  setInterval(setCorrectTypeYOperacion, 1500);
});
