import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

const inputFile = fileURLToPath(
  path.join(path.dirname(import.meta.url), "input.txt")
);
const input = fs.readFileSync(inputFile, "utf8");

const data = input.trim().split("\n");

let cd = "";
const dirSizes = {};

for (const line of data) {
  if (line.startsWith("$ ")) {
    const command = line.slice(2).split(" ");
    if (command[0] === "cd") {
      cd = path.normalize(path.join(cd, command[1]));
    }
  } else {
    if (/^(\d)+\s/.test(line)) {
      const [size, name] = line.split(" ");
      const numberSize = Number.parseInt(size);
      let parent = cd;
      while (true) {
        dirSizes[parent] = dirSizes[parent] ?? 0;
        dirSizes[parent] += numberSize;
        if (parent !== "/") {
          parent = path.join(parent, "..");
        } else {
          break;
        }
      }
    }
  }
}

const smallDirs = Object.entries(dirSizes).filter(([k, v]) => v < 100000);

const sumSmallDirs = smallDirs
  .map(([k, v]) => v)
  .reduce((prev, curr) => prev + curr, 0);

console.log("part 1:", sumSmallDirs);

const MAX_SPACE = 70000000;
const NEEDED_SPACE = 30000000;
const usedSpace = dirSizes["/"];
const REMAINING_SPACE = MAX_SPACE - usedSpace;
const SMALLEST_SIZE_TO_DELETE = NEEDED_SPACE - REMAINING_SPACE;

const largeEnough = Object.entries(dirSizes).filter(
  ([k, v]) => v >= SMALLEST_SIZE_TO_DELETE
);

const smallestEnough = largeEnough.slice().sort((a, b) => a[1] - b[1])[0];
const smallestEnoughSize = smallestEnough[1];

console.log("part 2:", smallestEnoughSize);
