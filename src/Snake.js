export default class Snake {
  constructor(sizeRaw, sizeColumn) {
    this.sizeRaw = sizeRaw;
    this.sizeColumn = sizeColumn;
    this.points = 0;
    this.body = [
      [1, 1], // tail
      [1, 2],
      [1, 3],
      [1, 4], // head
    ];
    this.food = [0, 0];
    this.length = this.body.length;
  }

  move(nextSpot) {
    this.body.push(nextSpot);
    this.body.shift();
  }

  #randint(min, max) {
    const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomInteger;
  }

  genFood() {
    for (;;) {
      const food = [
        this.#randint(0, this.sizeRaw - 1),
        this.#randint(0, this.sizeColumn - 1),
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
      this.body.push(spot);
    }
  }

  preventModificationSnake(nextSpot) {
    return this.body.some((element) => this.#equals(element, nextSpot));
  }

  checkBorders(x, y) {
    const xInBorder = x >= 0 && x <= this.sizeRaw - 1;
    const yInBorder = y >= 0 && y <= this.sizeRaw - 1;
    return xInBorder && yInBorder;
  }

  change(direction) {
    let [x, y] = this.body.at(-1);
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
          this.body.push(newPositionHead);
          this.points += 1;
          this.genFood();
        } else {
          this.move(newPositionHead);
        }
      }
    }
  }
}
