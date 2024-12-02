import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

const inputFile = fileURLToPath(
  path.join(path.dirname(import.meta.url), "input.txt")
);
const input = fs.readFileSync(inputFile, "utf8");

const data = input.trim().split("\n");
const width = data[0].length;
const height = data.length;

let numVisible = 0;
for (let y = 0; y < height; y++) {
  if (y === 0 || y === height - 1) {
    numVisible += width;
    continue;
  }

  xLoop: for (let x = 0; x < width; x++) {
    if (x === 0 || x === width - 1) {
      numVisible++;
      continue;
    }

    const self = Number(data[y][x]);

    dirLoop: for (let dir = 0; dir < 4; dir++) {
      const xStep = (dir % 2 ? 0 : 1) * (dir > 1 ? -1 : 1);
      const yStep = (dir % 2 ? 1 : 0) * (dir > 1 ? -1 : 1);
      let x2 = x + xStep;
      let y2 = y + yStep;
      while (data?.[y2]?.[x2]) {
        const comp = Number(data[y2][x2]);
        if (comp >= self) {
          continue dirLoop;
        }
        x2 += xStep;
        y2 += yStep;
      }
      numVisible++;
      continue xLoop;
    }
  }
}

console.log("part 1:", numVisible);

let largestScenicScore = 0;
for (let y = 0; y < height; y++) {
  if (y === 0 || y === height - 1) {
    continue;
  }

  for (let x = 0; x < width; x++) {
    if (x === 0 || x === width - 1) {
      continue;
    }

    const self = Number(data[y][x]);
    let selfScores = [];

    dirLoop: for (let dir = 0; dir < 4; dir++) {
      let dirScore = 0;

      const xStep = (dir % 2 ? 0 : 1) * (dir > 1 ? -1 : 1);
      const yStep = (dir % 2 ? 1 : 0) * (dir > 1 ? -1 : 1);
      let x2 = x + xStep;
      let y2 = y + yStep;
      while (data?.[y2]?.[x2]) {
        const comp = Number(data[y2][x2]);
        dirScore++;
        if (comp >= self) {
          selfScores.push(dirScore);
          continue dirLoop;
        }
        x2 += xStep;
        y2 += yStep;
      }
      selfScores.push(dirScore);
    }

    const selfScore =
      selfScores[0] * selfScores[1] * selfScores[2] * selfScores[3];
    if (selfScore > largestScenicScore) {
      largestScenicScore = selfScore;
    }
  }
}

console.log("part 2:", largestScenicScore);
