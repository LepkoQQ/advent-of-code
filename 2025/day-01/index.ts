import { loadInput } from "../utils";

const input = loadInput(import.meta.url);

const testInput = `
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`.trim();

console.log("day-01");

const startPos = 50;

const testAnswer1 = 3;

function numberOfPosAt0(input: string, any_move_past_zero = false): number {
  const lines = input.split("\n").map((line) => line.trim());
  let count = 0;

  let pos = startPos;
  for (const line of lines) {
    const turn = line[0];
    let num = parseInt(line.slice(1), 10);
    if (turn === "L") {
      num = -num;
    }
    if (any_move_past_zero) {
      for (let i = 0; i < Math.abs(num); i++) {
        pos = (pos + (num > 0 ? 1 : -1) + 100) % 100;
        if (pos === 0) {
          count++;
        }
      }
    } else {
      pos = (pos + num + 100) % 100;
      if (pos === 0) {
        count++;
      }
    }
  }

  return count;
}

console.log("Test 1:", numberOfPosAt0(testInput), "==", testAnswer1);
console.log("Part 1:", numberOfPosAt0(input));

const testAnswer2 = 6;

console.log("Test 2:", numberOfPosAt0(testInput, true), "==", testAnswer2);
console.log("Part 2:", numberOfPosAt0(input, true));
