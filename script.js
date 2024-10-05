const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameArea = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

let score = 0;
let isGameOver = false;
let obstacleSpeed = 5;

// Inicia el juego
function startGame() {
  obstacle.style.left = Math.random() * (gameArea.clientWidth - 40) + "px"; // Posición aleatoria
  obstacle.style.top = "-40px"; // Reinicia la posición
  moveObstacle();
}

// Mueve el obstáculo
function moveObstacle() {
  if (isGameOver) return;

  let obstaclePosition = parseInt(obstacle.style.top);
  obstaclePosition += obstacleSpeed;

  if (obstaclePosition > gameArea.clientHeight) {
    score++;
    scoreDisplay.textContent = `Puntuación: ${score}`;
    obstaclePosition = -40; // Resetea el obstáculo
    obstacle.style.left = Math.random() * (gameArea.clientWidth - 40) + "px"; // Nueva posición
  }

  obstacle.style.top = obstaclePosition + "px";
  checkCollision();
  requestAnimationFrame(moveObstacle);
}

// Verifica colisiones
function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    playerRect.x < obstacleRect.x + obstacleRect.width &&
    playerRect.x + playerRect.width > obstacleRect.x &&
    playerRect.y < obstacleRect.y + obstacleRect.height &&
    playerRect.y + playerRect.height > obstacleRect.y
  ) {
    gameOver();
  }
}

// Finaliza el juego
function gameOver() {
  isGameOver = true;
  alert(`¡Juego terminado! Tu puntuación final es ${score}`);
}

// Mueve al jugador
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    movePlayer(-10);
  } else if (event.key === "ArrowRight") {
    movePlayer(10);
  }
});

// Función para mover al jugador
function movePlayer(direction) {
  const playerPosition = parseInt(player.style.left);
  if (
    playerPosition + direction >= 0 &&
    playerPosition + direction <= gameArea.clientWidth - 40
  ) {
    player.style.left = playerPosition + direction + "px";
  }
}

// Inicia el juego
startGame();
