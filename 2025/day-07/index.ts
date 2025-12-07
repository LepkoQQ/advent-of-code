import { loadInput } from "../utils";

const input = loadInput(import.meta.url);
const testInput = `
.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............
`.trim();
const testAnswer1 = 21;
const testAnswer2 = 40;

console.log("day-07");

type BeamResult = {
  splitCount: number;
  timelineCount: number;
};

function splitBeams(input: string): BeamResult {
  const grid = input.split("\n").map((line) => line.split(""));
  const width = grid[0].length;
  const height = grid.length;

  // Part 1
  let splitCount = 0;
  // Part 2
  let timelineCount = 0;

  let timelinesAtPos: Record<string, number> = {};

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = grid[y][x];
      const above = grid[y - 1]?.[x];
      if (cell === "S") {
        grid[y][x] = "|";
        timelinesAtPos[`${x},${y}`] = 1;
      } else if (cell === "^") {
        if (above === "|") {
          splitCount++;
          const left = grid[y][x - 1];
          const right = grid[y][x + 1];
          if (left) {
            grid[y][x - 1] = "|";
            const aT = timelinesAtPos[`${x},${y - 1}`] || 0;
            const lT = timelinesAtPos[`${x - 1},${y}`] || 0;
            timelinesAtPos[`${x - 1},${y}`] = lT + aT;
          }
          if (right) {
            grid[y][x + 1] = "|";
            const aT = timelinesAtPos[`${x},${y - 1}`] || 0;
            const rT = timelinesAtPos[`${x + 1},${y}`] || 0;
            timelinesAtPos[`${x + 1},${y}`] = rT + aT;
          }
        }
      } else {
        if (above === "|") {
          grid[y][x] = "|";
          const aT = timelinesAtPos[`${x},${y - 1}`] || 0;
          const t = timelinesAtPos[`${x},${y}`] || 0;
          timelinesAtPos[`${x},${y}`] = t + aT;
        }
      }
    }
  }

  // for (let y = 0; y < height; y++) {
  //   for (let x = 0; x < width; x++) {
  //     const cell = grid[y][x];
  //     if (cell === "|") {
  //       const t = timelinesAtPos[`${x},${y}`] || 0;
  //       process.stdout.write(String(t).padStart(2, " ").padEnd(3, " "));
  //     } else if (cell === "^") {
  //       process.stdout.write(
  //         "\x1b[31m" + cell.padStart(2, " ").padEnd(3, " ") + "\x1b[0m",
  //       );
  //     } else {
  //       process.stdout.write(
  //         "\x1b[34m" + cell.padStart(2, " ").padEnd(3, " ") + "\x1b[0m",
  //       );
  //     }
  //   }
  //   process.stdout.write("\n");
  // }

  for (let x = 0; x < width; x++) {
    const key = `${x},${height - 1}`;
    const t = timelinesAtPos[key] || 0;
    timelineCount += t;
  }

  return { splitCount, timelineCount };
}

const testResult = splitBeams(testInput);
const result = splitBeams(input);

console.log("Test 1:", testResult.splitCount, "==", testAnswer1);
console.log("Part 1:", result.splitCount);

console.log("Test 2:", testResult.timelineCount, "==", testAnswer2);
console.log("Part 2:", result.timelineCount);
