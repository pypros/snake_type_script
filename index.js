import Snake from "./src/Snake.js";
import readStdin from "./src/Keyboard.js";
import BoardGameConsole from "./src/BoardGameConsole.js";

const sizeRaw = 10;
const sizeColumn = 10;
const snake = new Snake(sizeRaw, sizeColumn);
const boardGame = new BoardGameConsole(sizeRaw, sizeColumn);
async function main() {
  boardGame.clear();
  for (let i = 0; i < snake.body.length; i += 1) {
    boardGame.drawPixel([...snake.body[i], "x"]);
  }
  boardGame.drawPixel([...snake.food, "T"]);
  console.clear();
  boardGame.printGame(snake.points);
  const keyValue = await readStdin();
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
