export default class BoardGameConsole {
  sizeRaw: number;

  sizeColumn: number;

  boardGame: string[][];

  public constructor(sizeRaw: number, sizeColumn: number) {
    this.sizeRaw = sizeRaw;
    this.sizeColumn = sizeColumn;
    this.boardGame = Array.from(Array(this.sizeRaw), (): string[] => {
      const line = new Array(this.sizeColumn).fill("0");
      return line;
    });
  }

  public clear(): void {
    this.boardGame = Array.from(Array(this.sizeRaw), (): string[] => {
      const line = new Array(this.sizeColumn).fill("0");
      return line;
    });
  }

  public printGame(points: number): void {
    console.log(`Points: ${points}`);
    console.log(
      Array(this.sizeRaw + 2)
        .fill("-")
        .join("")
    );
    this.boardGame.forEach((element) => {
      console.log(`-${element.join("")}-`);
    });
    console.log(
      Array(this.sizeRaw + 2)
        .fill("-")
        .join("")
    );
    console.log(`Exit: ESC`);
  }

  public drawPixel([x, y, representation]: [number, number, string]): void {
    this.boardGame[x][y] = representation;
  }
}
