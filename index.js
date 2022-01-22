import Snake from "./src/Snake.js";

const snake = new Snake(10, 10);

async function main() {
  snake.boardGame.clear();
  const snakeToDraw = snake.getFullSnake();
  for (let i = 0; i < snakeToDraw.length; i += 1) {
    snake.boardGame.drawPixel([...snakeToDraw[i], "x"]);
  }
  snake.boardGame.drawPixel([...snake.food, "T"]);
  console.clear();
  snake.boardGame.printGame(snake.points);
  await snake.changeDirection();
  if (snake.keyboard.keyValue !== "\u001b") {
    main();
  }
}

await main();
