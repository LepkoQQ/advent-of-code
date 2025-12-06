import { loadInput } from "../utils";

const input = loadInput(import.meta.url);
const testInput = `
123 328  51 64
 45 64  387 23
  6 98  215 314
*   +   *   +
`.trim();
const testAnswer1 = 4277556;
const testAnswer2 = 3263827;

console.log("day-06");

function findEmptyColumns(lines: string[]): number[] {
  const width = lines[0].length;
  const emptyColumns: number[] = [];

  for (let col = 0; col < width; col++) {
    let isEmpty = true;
    for (let row = 0; row < lines.length; row++) {
      if (lines[row][col] !== " ") {
        isEmpty = false;
        break;
      }
    }
    if (isEmpty) {
      emptyColumns.push(col);
    }
  }

  return emptyColumns;
}

function splitColumns(input: string): string[][] {
  const lines = input.split("\n");
  const emptyColumns = findEmptyColumns(lines);
  const columns: string[][] = [];

  let lastIndex = 0;
  for (const colIndex of emptyColumns) {
    const columnLines = lines.map((line) => line.slice(lastIndex, colIndex));
    columns.push(columnLines);
    lastIndex = colIndex;
  }
  const lastColumnLines = lines.map((line) => line.slice(lastIndex));
  columns.push(lastColumnLines);

  return columns;
}

function solveProblem(column: string[]): number {
  const operator = column.at(-1)?.trim();
  const numbers = column.slice(0, -1).map((str) => parseInt(str, 10));

  if (operator === "+") {
    return numbers.reduce((a, b) => a + b, 0);
  } else if (operator === "*") {
    return numbers.reduce((a, b) => a * b, 1);
  }
  throw new Error(`Unknown operator: ${operator}`);
}

// Part 1
function solve(input: string): number {
  const columns = splitColumns(input);
  let sum = 0;

  for (const column of columns) {
    sum += solveProblem(column);
  }

  return sum;
}

function rotateInput(input: string): string[] {
  const lines = input.split("\n");
  const width = Math.max(...lines.map((line) => line.length));
  const height = lines.length;

  // rotate 90 degrees counter-clockwise
  let rotatedLines: string[] = [];
  for (let col = width - 1; col >= 0; col--) {
    let newLine = "";
    for (let row = 0; row < height; row++) {
      newLine += lines[row]?.[col] ?? " ";
    }
    rotatedLines.push(newLine);
  }

  return rotatedLines;
}

type Problem = {
  lines: string[];
  operator: string;
};

// Part 2
function solveVertical(input: string): number {
  const rotatedLines = rotateInput(input);
  const problems: Problem[] = [];

  let currentProblem: Problem = {
    lines: [],
    operator: "",
  };
  rotatedLines.forEach((line) => {
    const l = line.trim();
    if (l.endsWith("+")) {
      currentProblem.operator = "+";
      currentProblem.lines.push(l.slice(0, -1));
    } else if (l.endsWith("*")) {
      currentProblem.operator = "*";
      currentProblem.lines.push(l.slice(0, -1));
    } else if (l === "") {
      problems.push(currentProblem);
      currentProblem = {
        lines: [],
        operator: "",
      };
    } else {
      currentProblem.lines.push(l);
    }
  });
  problems.push(currentProblem);

  let sum = 0;
  for (const problem of problems) {
    const numbers = problem.lines.map((str) => parseInt(str, 10));
    if (problem.operator === "+") {
      sum += numbers.reduce((a, b) => a + b, 0);
    } else if (problem.operator === "*") {
      sum += numbers.reduce((a, b) => a * b, 1);
    }
  }

  return sum;
}

console.log("Test 1:", solve(testInput), "==", testAnswer1);
console.log("Part 1:", solve(input));

console.log("Test 2:", solveVertical(testInput), "==", testAnswer2);
console.log("Part 2:", solveVertical(input));
