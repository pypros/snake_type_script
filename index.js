import { stdin } from "process";

function toUnicode(theString) {
  let unicodeString = "";
  for (var i = 0; i < theString.length; i++) {
    var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
    while (theUnicode.length < 4) {
      theUnicode = "0" + theUnicode;
    }
    theUnicode = "\\u" + theUnicode;
    unicodeString += theUnicode;
  }
  return unicodeString;
}

async function readStdinSync() {
  return new Promise((resolve) => {
    stdin.setRawMode(true);
    stdin.setEncoding("utf8");
    stdin.resume();
    stdin.on("data", function (key) {
      stdin.pause();
      resolve(key);
    });
  });
}

class BoardGameConsole {
  constructor(sizeRaw, sizeColumn) {
    this.sizeRaw = sizeRaw;
    this.sizeColumn = sizeColumn;
    this.boardGame = Array.from(Array(this.sizeRaw), () => {
      return new Array(this.sizeColumn).fill("0");
    });
  }
  clear() {
    this.boardGame = Array.from(Array(this.sizeRaw), () => {
      return new Array(this.sizeColumn).fill("0");
    });
  }

  printGame() {
    console.log(
      Array(this.sizeRaw + 2)
        .fill("-")
        .join("")
    );
    this.boardGame.forEach((element) => {
      console.log("-" + element.join("") + "-");
    });
    console.log(
      Array(this.sizeRaw + 2)
        .fill("-")
        .join("")
    );
  }
  drawPixel(pixel) {
    let [x, y, representation] = pixel;
    this.boardGame[x][y] = representation;
  }
  drawPixels(pixels) {
    pixels.forEach((pixel) => this.drawPixel(pixel));
  }
  movePixel(currentPixel, nextPixel) {
    let [cx, cy, currentPixelRepresentation] = currentPixel;
    let [nx, ny, nextPixelRepresentation] = nextPixel;
    currentPixelRepresentation = this.boardGame[cx][cy];
    nextPixelRepresentation = this.boardGame[nx][ny];
    this.boardGame[cx][cy] = nextPixelRepresentation;
    this.boardGame[nx][ny] = currentPixelRepresentation;
  }
}

class Keyboard {
  constructor() {
    this.keyValue = null;
  }

  async getKeyValue() {
    this.keyValue = await readStdinSync();
    return this.keyValue;
  }
}

class Snake {
  constructor(sizeRaw, sizeColumn) {
    this.sizeRaw = sizeRaw;
    this.sizeColumn = sizeColumn;
    this.tail = [1, 1];
    this.body = [
      [1, 2],
      [1, 3],
    ];
    this.head = [1, 4];
    this.keyboard = new Keyboard();
    this.boardGame = new BoardGameConsole(this.sizeRaw, this.sizeColumn);
    this.food = Array(0, 0);
    this.length = [this.tail, ...this.body, this.head].length;
  }
  _getFullSnake() {
    return [this.tail, ...this.body, this.head];
  }

  toString() {
    return JSON.stringify(this._getFullSnake());
  }

  [Symbol.iterator]() {
    let index = 0;
    let fullSnake = this._getFullSnake();
    return {
      next: () => {
        if (index < fullSnake.length) {
          return { value: fullSnake[index++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  }

  move(nextSpot) {
    this.body.push(this.head);
    this.head = nextSpot;
    this.tail = this.body.shift();
  }

  _randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  genFood() {
    while (true) {
      let food = [
        this._randint(0, this.boardGame.sizeRaw - 1),
        this._randint(0, this.boardGame.sizeColumn - 1),
      ];
      if (!this._getFullSnake().includes(food)) {
        this.food = food;
        break;
      }
    }
  }

  _equals(firstArray, secondArray) {
    return (
      firstArray.length === secondArray.length &&
      firstArray.every((v, i) => v === secondArray[i])
    );
  }

  eatFood(spot) {
    if (this._equals(this.food, spot)) {
      this.body.push(this.head);
      this.head = spot;
    }
  }

  preventBackwardMovement(nextSpot) {
    if (!this._getFullSnake().includes(nextSpot)) {
      return true;
    } else {
      return false;
    }
  }

  mapKeyValueOnDirection(keyValue) {
    let direction = {
      "\u001b[A": "up",
      "\u001b[B": "down",
      "\u001b[C": "right",
      "\u001b[D": "left",
      "\u001b": "exit",
    };
    return direction[keyValue] || "Wrong key";
  }

  checkBorders(x, y) {
    let xInBorder = false;
    let yInBorder = false;
    xInBorder = x >= 0 && x <= this.boardGame.sizeRaw - 1;
    yInBorder = y >= 0 && y <= this.boardGame.sizeRaw - 1;
    return xInBorder && yInBorder;
  }

  async changeDirection() {
    let keyValue = await this.keyboard.getKeyValue();
    let direction = this.mapKeyValueOnDirection(keyValue);
    let [x, y] = this.head;
    switch (direction) {
      case "up":
        x--;
        break;
      case "down":
        x++;
        break;
      case "right":
        y++;
        break;
      case "left":
        y--;
        break;
    }
    let newPositionHead = [x, y];
    if (this.checkBorders(x, y)) {
      if (this.preventBackwardMovement(newPositionHead)) {
        if (this._equals(newPositionHead, this.food)) {
          this.body.push(this.head);
          this.head = newPositionHead;
          this.genFood();
        }
        this.move(newPositionHead);
      }
    }
  }
}
const sleep = (waitTimeInMs) =>
  new Promise((resolve) => setTimeout(resolve, waitTimeInMs));

let snake = new Snake(10, 10);
while (true) {
  snake.boardGame.clear();
  for (const element of snake) {
    snake.boardGame.drawPixel([...element, "x"]);
  }
  snake.boardGame.drawPixel([...snake.food, "T"]);
  console.clear();
  snake.boardGame.printGame();
  await snake.changeDirection();
  // snake.forEach((element) => console.log(element))
  // await sleep(10000);
  if (snake.keyboard.keyValue === "\u001b") {
    break;
  }
}
