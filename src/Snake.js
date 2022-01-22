import { Keyboard } from "./Keyboard.js";
import BoardGameConsole from "./BoardGameConsole.js";

export default class Snake {
  constructor(sizeRaw, sizeColumn) {
    this.sizeRaw = sizeRaw;
    this.sizeColumn = sizeColumn;
    this.tail = [1, 1];
    this.body = [
      [1, 2],
      [1, 3],
    ];
    this.points = 0;
    this.head = [1, 4];
    this.keyboard = new Keyboard();
    this.boardGame = new BoardGameConsole(this.sizeRaw, this.sizeColumn);
    this.food = [0, 0];
    this.length = [this.tail, ...this.body, this.head].length;
  }

  getFullSnake = () => {
    const fullSanke = [this.tail, ...this.body, this.head];
    return fullSanke;
  };

  toString() {
    return JSON.stringify(this.getFullSnake());
  }

  [Symbol.iterator]() {
    return this.getFullSnake()[Symbol.iterator]();
  }

  move(nextSpot) {
    this.body.push(this.head);
    this.head = nextSpot;
    this.tail = this.body.shift();
  }

  #randint(min, max) {
    const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomInteger;
  }

  genFood() {
    for (;;) {
      const food = [
        this.#randint(0, this.boardGame.sizeRaw - 1),
        this.#randint(0, this.boardGame.sizeColumn - 1),
      ];
      if (!this.preventModificationSnake(food)) {
        this.food = food;
        break;
      }
    }
  }

  #equals(firstArray, secondArray) {
    return (
      firstArray.length === secondArray.length &&
      firstArray.every((v, i) => v === secondArray[i])
    );
  }

  eatFood(spot) {
    if (this.#equals(this.food, spot)) {
      this.body.push(this.head);
      this.head = spot;
    }
  }

  preventModificationSnake(nextSpot) {
    return this.getFullSnake().some((element) =>
      this.#equals(element, nextSpot)
    );
  }

  #mapKeyValueOnDirection(keyValue) {
    const direction = {
      "\u001b[A": "up",
      "\u001b[B": "down",
      "\u001b[C": "right",
      "\u001b[D": "left",
      "\u001b": "exit",
    };
    return direction[keyValue] || "Wrong key";
  }

  checkBorders(x, y) {
    const xInBorder = x >= 0 && x <= this.boardGame.sizeRaw - 1;
    const yInBorder = y >= 0 && y <= this.boardGame.sizeRaw - 1;
    return xInBorder && yInBorder;
  }

  async changeDirection() {
    const keyValue = await this.keyboard.getKeyValue();
    const direction = this.#mapKeyValueOnDirection(keyValue);
    let [x, y] = this.head;
    switch (direction) {
      case "up":
        x -= 1;
        break;
      case "down":
        x += 1;
        break;
      case "right":
        y += 1;
        break;
      case "left":
        y -= 1;
        break;
      default:
        break;
    }
    const newPositionHead = [x, y];
    if (this.checkBorders(x, y)) {
      if (!this.preventModificationSnake(newPositionHead)) {
        if (this.#equals(newPositionHead, this.food)) {
          this.body.push(this.head);
          this.head = newPositionHead;
          this.points += 1;
          this.genFood();
        } else {
          this.move(newPositionHead);
        }
      }
    }
  }
}
