import Snake from "./src/Snake";

const snake = new Snake(10, 10);
for (;;) {
  snake.boardGame.clear();
  for (const [x, y] of snake) {
    snake.boardGame.drawPixel([x, y, "x"]);
  }
  snake.boardGame.drawPixel([...snake.food, "T"]);
  console.clear();
  snake.boardGame.printGame(snake.points);
  await snake.changeDirection();
  if (snake.keyboard.keyValue === "\u001b") {
    break;
  }
}
