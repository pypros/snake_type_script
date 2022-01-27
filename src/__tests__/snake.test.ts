import Snake from "../Snake";

test("Snake init", () => {
  // Snake.body = [
  //   [1, 1],
  //   [1, 2],
  //   [1, 3],
  //   [1, 4],
  // ];
  // Snake.length === Snake.body.length
  let snake = new Snake(10, 10);
  expect(snake.length).toBe(4);
});
