export default class BoardGameConsole {
  constructor(sizeRaw, sizeColumn) {
    this.sizeRaw = sizeRaw;
    this.sizeColumn = sizeColumn;
    this.boardGame = Array.from(Array(this.sizeRaw), () => {
      const line = new Array(this.sizeColumn).fill("0");
      return line;
    });
  }

  clear() {
    this.boardGame = Array.from(Array(this.sizeRaw), () => {
      const line = new Array(this.sizeColumn).fill("0");
      return line;
    });
  }

  printGame(points) {
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
  }

  drawPixel(pixel) {
    const [x, y, representation] = pixel;
    this.boardGame[x][y] = representation;
  }

  drawPixels(pixels) {
    pixels.forEach((pixel) => this.drawPixel(pixel));
  }

  movePixel(currentPixel, nextPixel) {
    const [cx, cy] = currentPixel;
    const [nx, ny] = nextPixel;
    const currentPixelRepresentation = this.boardGame[cx][cy];
    const nextPixelRepresentation = this.boardGame[nx][ny];
    this.boardGame[cx][cy] = nextPixelRepresentation;
    this.boardGame[nx][ny] = currentPixelRepresentation;
  }
}
