// Game constants and variable
const foodSound = new Audio("../assets/food.mp3");
const gameOverSound = new Audio("../assets/gameover.mp3");
const moveSound = new Audio("../assets/move.mp3");
const musicSound = new Audio("../assets/music.mp3");
let inputDir = { x: 0, y: 0 };

const speed = 10;
let score = 0;
let lastPaintTime = 0;

let snakeArr = [{ x: 13, y: 15 }];

food = { x: 10, y: 5 };

const board = document.getElementById("board");
const Score = document.getElementById("score");

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  //   console.log(ctime);

  gameEngine();
}

function isCollide(snake) {
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      score = 0;
      return true;
    }
  }

  if (snake[0].x < 1 || snake[0].x > 18 || snake[0].y < 1 || snake[0].y > 18) {
    score = 0;
    return true;
  }
  return false;
}

function gameEngine() {
  // Part-1: Updating the snake array
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();

    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any Key to play again");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
    Score.innerHTML = "Score: 0";
  }

  // If you have eaten the food, increment the score, and egenrate the food

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    Score.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part-2: Render the snake food
  // Display the Snake
  board.innerHTML = "";
  snakeArr.forEach((e, i) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    snakeElement.classList.add(i == 0 ? "head" : "snake");

    board.appendChild(snakeElement);
  });

  //   Display the Food
  fooodElement = document.createElement("div");
  fooodElement.style.gridRowStart = food.y;
  fooodElement.style.gridColumnStart = food.x;
  fooodElement.classList.add("food");
  board.appendChild(fooodElement);
}

// Main Logic starts here
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  //   musicSound.play();

  //   inputDir = { x: 0, y: 1 }; // Start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
