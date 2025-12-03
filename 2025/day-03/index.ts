import { loadInput } from "../utils";

const input = loadInput(import.meta.url);

const testInput = `
987654321111111
811111111111119
234234234234278
818181911112111
`.trim();
const testAnswer1 = 357;
const testAnswer2 = 3121910778619;

console.log("day-03");

function biggestDigit(str: string): string {
  return Math.max(...str.split("").map((c) => parseInt(c, 10))).toString();
}

function lineJoltage2(inputLine: string): number {
  const digit1 = biggestDigit(inputLine.slice(0, -1));
  const digitIndex = inputLine.indexOf(digit1);
  const digit2 = biggestDigit(inputLine.slice(digitIndex + 1));
  return parseInt(`${digit1}${digit2}`, 10);
}

function lineJoltage12(inputLine: string): number {
  let line = inputLine;
  while (line.length > 12) {
    for (let i = 0; i < line.length; i++) {
      const digit = parseInt(line[i], 10);
      const next = i + 1 < line.length ? parseInt(line[i + 1], 10) : 99;
      if (digit < next) {
        line = line.slice(0, i) + line.slice(i + 1);
        break;
      }
    }
  }
  return parseInt(line, 10);
}

function totalJoltage(input: string, part2: boolean = false): number {
  const lineFunc = part2 ? lineJoltage12 : lineJoltage2;
  const joltagePerLine = input.split("\n").map((line) => lineFunc(line));
  return joltagePerLine.reduce((a, b) => a + b, 0);
}

console.log("Test 1:", totalJoltage(testInput), "==", testAnswer1);
console.log("Part 1:", totalJoltage(input));

console.log("Test 2:", totalJoltage(testInput, true), "==", testAnswer2);
console.log("Part 2:", totalJoltage(input, true));
