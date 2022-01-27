import Snake from "./Snake";
import readStdin from "./Keyboard";
import BoardGameConsole from "./BoardGameConsole";

const sizeRaw: number = 10;
const sizeColumn: number = 10;
const snake: Snake = new Snake(sizeRaw, sizeColumn);
const boardGame: BoardGameConsole = new BoardGameConsole(sizeRaw, sizeColumn);

function main() {
  boardGame.clear();
  for (let i = 0; i < snake.body.length; i += 1) {
    boardGame.drawPixel([snake.body[i][0], snake.body[i][1], "x"]);
  }
  boardGame.drawPixel([snake.food[0], snake.food[1], "T"]);
  console.clear();
  boardGame.printGame(snake.points);
  const mapKeyValue: Record<string, string> = {
    "\u001b[A": "up",
    "\u001b[B": "down",
    "\u001b[C": "right",
    "\u001b[D": "left",
    "\u001b": "exit",
  };

  readStdin().then((keyValue) => {
    const direction = mapKeyValue[keyValue];
    snake.change(direction);
    if (direction !== "exit") {
      main();
    }
  });
}

main();
