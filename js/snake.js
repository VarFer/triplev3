const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");
const scale = 20;  // Tamaño de cada bloque
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let fruit;
let score = 0;
let gameStarted = false;  // Variable para verificar si el juego ha comenzado

// Constructor de la serpiente
function Snake() {
  this.body = [{x: 5, y: 5}];  // Posición inicial de la serpiente
  this.direction = "right";  // Dirección inicial

  this.move = function() {
    let head = this.body[0];
    let newHead;

    // Movimiento basado en la dirección
    if (this.direction === "right") {
      newHead = {x: head.x + 1, y: head.y};
    } else if (this.direction === "left") {
      newHead = {x: head.x - 1, y: head.y};
    } else if (this.direction === "up") {
      newHead = {x: head.x, y: head.y - 1};
    } else if (this.direction === "down") {
      newHead = {x: head.x, y: head.y + 1};
    }

    // Insertar la nueva cabeza al principio del array
    this.body.unshift(newHead);

    // Comprobar si la serpiente come la fruta
    if (newHead.x === fruit.x && newHead.y === fruit.y) {
      score += 10;
      document.getElementById("snakeScore").innerText = score;
      createFruit();  // Crear una nueva fruta
    } else {
      this.body.pop();  // Eliminar la última parte de la serpiente si no hay colisión
    }
  };

  // Cambiar la dirección con las teclas de flecha
  this.changeDirection = function(event) {
    if (event.keyCode === 37 && this.direction !== "right") {
      this.direction = "left";
    } else if (event.keyCode === 38 && this.direction !== "down") {
      this.direction = "up";
    } else if (event.keyCode === 39 && this.direction !== "left") {
      this.direction = "right";
    } else if (event.keyCode === 40 && this.direction !== "up") {
      this.direction = "down";
    }
  };

  // Método para dibujar la serpiente en el canvas
  this.draw = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpiar el canvas antes de dibujar
    ctx.fillStyle = "green";
    this.body.forEach(function(segment) {
      ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);  // Dibujar cada segmento de la serpiente
    });
  };

  // Comprobar colisiones
  this.checkCollision = function() {
    let head = this.body[0];
    // Colisión con las paredes
    if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows) {
      return true;
    }
    // Colisión con la propia serpiente
    for (let i = 1; i < this.body.length; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        return true;
      }
    }
    return false;
  };
}

// Generador de frutas
function createFruit() {
  let x = Math.floor(Math.random() * columns);
  let y = Math.floor(Math.random() * rows);
  fruit = {x: x, y: y};
}

// Dibujar la fruta
function drawFruit() {
  ctx.fillStyle = "red";
  ctx.fillRect(fruit.x * scale, fruit.y * scale, scale, scale);
}

// Función de actualización del juego
function updateGame() {
  if (!gameStarted) return;  // No empezar el juego hasta que se haya iniciado

  snake.move();  // Mover la serpiente
  if (snake.checkCollision()) {
    alert("Game Over! Tu puntaje: " + score);
    gameStarted = false;  // Detener el juego
    score = 0;
    document.getElementById("snakeScore").innerText = score;
    return;
  }

  snake.draw();  // Dibujar la serpiente
  drawFruit();   // Dibujar la fruta
}

// Función para iniciar el juego
function startGame() {
  if (gameStarted) return;  // Evitar que el juego se inicie si ya está en curso

  snake = new Snake();
  createFruit();
  gameStarted = true;  // Indicar que el juego ha comenzado

  // Iniciar el ciclo de actualización utilizando un bucle simple
  setInterval(updateGame, 200);  // Cambié el intervalo a 200ms para reducir la velocidad

  // Escuchar las teclas para cambiar la dirección
  document.addEventListener("keydown", function(event) {
    snake.changeDirection(event);
  });
}

// Función para reiniciar el juego
function restartGame() {
  document.addEventListener("keydown", function(event) {
    if (!gameStarted) {
      startGame();
    }
  });
}

// Iniciar el juego cuando se presiona cualquier tecla (para evitar que se inicie al cargar la página)
restartGame();
