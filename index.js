import Snake from "./src/Snake.js";
import { readStdinSync } from "./src/Keyboard.js";

const snake = new Snake(10, 10);

async function main() {
  snake.boardGame.clear();
  for (let i = 0; i < snake.body.length; i += 1) {
    snake.boardGame.drawPixel([...snake.body[i], "x"]);
  }
  snake.boardGame.drawPixel([...snake.food, "T"]);
  console.clear();
  snake.boardGame.printGame(snake.points);
  const keyValue = await readStdinSync();
  const mapKeyValue = {
    "\u001b[A": "up",
    "\u001b[B": "down",
    "\u001b[C": "right",
    "\u001b[D": "left",
    "\u001b": "exit",
  };
  const direction = mapKeyValue[keyValue];
  snake.change(direction);
  if (direction !== "exit") {
    main();
  }
}

await main();
