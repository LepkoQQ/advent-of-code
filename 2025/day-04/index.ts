import { dirs8, loadInput } from "../utils";

const input = loadInput(import.meta.url);
const testInput = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`.trim();
const testAnswer1 = 13;
const testAnswer2 = 43;

console.log("day-04");

function accessiblePositions(input: string, maxRepeats: number): number {
  const lines = input.split("\n").map((line) => line.trim().split(""));
  const width = lines[0].length;
  const height = lines.length;

  let count = 0;

  while (maxRepeats) {
    maxRepeats--;
    const lastCount = count;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const cell = lines[y][x];
        if (cell === "@") {
          let neighbors = 0;
          dirs8().forEach(([dx, dy]) => {
            const nx = x + dx;
            const ny = y + dy;
            const ncell = lines[ny]?.[nx];
            if (ncell === "@") {
              neighbors++;
            }
          });
          if (neighbors < 4) {
            count++;
            lines[y][x] = "x";
          }
        }
      }
    }

    if (count === lastCount) {
      break;
    }
  }

  return count;
}

let n = 1;
console.log("Test 1:", accessiblePositions(testInput, n), "==", testAnswer1);
console.log("Part 1:", accessiblePositions(input, n));

n = Number.MAX_SAFE_INTEGER;
console.log("Test 2:", accessiblePositions(testInput, n), "==", testAnswer2);
console.log("Part 2:", accessiblePositions(input, n));
