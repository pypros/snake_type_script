export default async function readStdin(): Promise<string> {
  return new Promise<string>((resolve) => {
    process.stdin.setRawMode(true);
    process.stdin.setEncoding("utf8");
    process.stdin.resume();
    process.stdin.once("data", (key: string) => {
      resolve(key);
      process.stdin.pause();
    });
  });
}
