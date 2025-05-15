const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");
const scale = 20;  // Tamaño de cada bloque
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let fruit;
let score = 0;
let gameStarted = false;
let gameInterval;

// Constructor de la serpiente
function Snake() {
  this.body = [{x: 5, y: 5}];
  this.direction = "right";

  this.move = function() {
    let head = this.body[0];
    let newHead;

    if (this.direction === "right") {
      newHead = {x: head.x + 1, y: head.y};
    } else if (this.direction === "left") {
      newHead = {x: head.x - 1, y: head.y};
    } else if (this.direction === "up") {
      newHead = {x: head.x, y: head.y - 1};
    } else if (this.direction === "down") {
      newHead = {x: head.x, y: head.y + 1};
    }

    this.body.unshift(newHead);

    if (newHead.x === fruit.x && newHead.y === fruit.y) {
      score += 10;
      document.getElementById("snakeScore").innerText = score;
      createFruit();
    } else {
      this.body.pop();
    }
  };

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

  this.draw = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    this.body.forEach(function(segment) {
      ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
    });
  };

  this.checkCollision = function() {
    let head = this.body[0];
    if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows) {
      return true;
    }
    for (let i = 1; i < this.body.length; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        return true;
      }
    }
    return false;
  };
}

// Crear fruta en una posición aleatoria
function createFruit() {
  fruit = {
    x: Math.floor(Math.random() * columns),
    y: Math.floor(Math.random() * rows)
  };
}

// Dibujar la fruta en el canvas
function drawFruit() {
  ctx.fillStyle = "red";
  ctx.fillRect(fruit.x * scale, fruit.y * scale, scale, scale);
}

// Actualizar el estado del juego
function updateGame() {
  if (!gameStarted) return;

  snake.move();
  if (snake.checkCollision()) {
    alert("Game Over! Tu puntaje: " + score);
    gameStarted = false;
    clearInterval(gameInterval);
    score = 0;
    document.getElementById("snakeScore").innerText = score;
    return;
  }

  snake.draw();
  drawFruit();
}

// Iniciar el juego
function startGame() {
  if (gameStarted) return;

  snake = new Snake();
  createFruit();
  gameStarted = true;
  clearInterval(gameInterval); // Por si acaso hay uno corriendo
  gameInterval = setInterval(updateGame, 200);

  document.removeEventListener("keydown", handleDirection);
  document.addEventListener("keydown", handleDirection);
}

// Manejador para cambiar dirección
function handleDirection(event) {
  if (snake) {
    snake.changeDirection(event);
  }
}

// Reiniciar el juego presionando cualquier tecla si está detenido
function restartGame() {
  document.addEventListener("keydown", function(event) {
    if (!gameStarted) {
      startGame();
    }
  }, { once: true }); // Solo una vez hasta el siguiente Game Over
}

// Ejecutar al cargar
restartGame();
