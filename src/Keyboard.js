export default async function readStdin() {
  return new Promise((resolve) => {
    process.stdin.setRawMode(true);
    process.stdin.setEncoding("utf8");
    process.stdin.resume();
    process.stdin.once("data", (key) => {
      resolve(key);
      process.stdin.pause();
    });
  });
}
