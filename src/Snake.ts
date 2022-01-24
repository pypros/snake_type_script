export default class Snake {
  sizeRaw: number;

  sizeColumn: number;

  points: number;

  body: number[][];

  food: number[];

  length: number;

  public constructor(sizeRaw: number, sizeColumn: number) {
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

  private move(nextSpot: number[]): void {
    this.body.push(nextSpot);
    this.body.shift();
  }

  private randint(min: number, max: number): number {
    const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomInteger;
  }

  private eatFood(spot: number[]): void {
    this.body.push(spot);
    this.points += 1;
  }

  private preventModificationSnake(nextSpot: number[]): boolean {
    return this.body.some((element: number[]) =>
      this.equals(element, nextSpot)
    );
  }

  private generateFood(): void {
    for (;;) {
      const food = [
        this.randint(0, this.sizeRaw - 1),
        this.randint(0, this.sizeColumn - 1),
      ];
      if (!this.preventModificationSnake(food)) {
        this.food = food;
        break;
      }
    }
  }

  private equals(firstArray: number[], secondArray: number[]): boolean {
    return (
      firstArray.length === secondArray.length &&
      firstArray.every((v: number, i: number) => v === secondArray[i])
    );
  }

  private checkBorders(x: number, y: number): boolean {
    const xInBorder = x >= 0 && x <= this.sizeRaw - 1;
    const yInBorder = y >= 0 && y <= this.sizeColumn - 1;
    return xInBorder && yInBorder;
  }

  public change(direction: string): void {
    let [x, y]: number[] = this.body[this.body.length - 1];

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

    const newPositionHead: number[] = [x, y];
    const newPointIsInBorders: boolean = this.checkBorders(x, y);
    const newPointIsNotInBody: boolean =
      !this.preventModificationSnake(newPositionHead);
    const newPointCanMove: boolean = newPointIsInBorders && newPointIsNotInBody;
    const newPointIsFood: boolean = this.equals(newPositionHead, this.food);

    if (newPointCanMove && newPointIsFood) {
      this.eatFood(newPositionHead);
      this.generateFood();
    } else if (newPointCanMove) {
      this.move(newPositionHead);
    }
  }
}
