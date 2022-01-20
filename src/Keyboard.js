export function toUnicode(theString) {
  let unicodeString = "";
  for (let i = 0; i < theString.length; i += 1) {
    let theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
    while (theUnicode.length < 4) {
      theUnicode = `0${theUnicode}`;
    }
    theUnicode = `0${theUnicode}`;
    theUnicode = `\\u${theUnicode}`;
    unicodeString += theUnicode;
  }
  return unicodeString;
}

export async function readStdinSync() {
  return new Promise((resolve) => {
    process.stdin.setRawMode(true);
    process.stdin.setEncoding("utf8");
    process.stdin.resume();
    process.stdin.on("data", (key) => {
      process.stdin.pause();
      resolve(key);
    });
  });
}

export class Keyboard {
  constructor() {
    this.keyValue = null;
  }

  async getKeyValue() {
    this.keyValue = await readStdinSync();
    return this.keyValue;
  }
}
