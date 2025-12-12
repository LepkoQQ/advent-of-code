import { loadInput } from "../utils";
import GLPK from "glpk.js";
import type { LP } from "glpk.js";

const input = loadInput(import.meta.url);
const testInput = `
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}
`.trim();
const testAnswer1 = 7;
const testAnswer2 = 33;

console.log("day-10");

type ParsedLineBinary = { solution: number; buttons: number[] };
type ParsedLineIndices = { solution: number[]; buttons: number[][] };

function parseInputBinary(input: string): ParsedLineBinary[] {
  return input.split("\n").map((line) => {
    const parts = line.trim().split(" ");
    const solutionBitLength = parts.at(0)!.length - 2;
    const solution = parts
      .at(0)!
      .slice(1, -1)
      .split("")
      .map((c) => Number(c === "#"))
      .reduce(
        (acc, curr, idx, arr) => acc + curr * 2 ** (arr.length - 1 - idx),
        0,
      );
    const buttons = parts.slice(1, -1).map((part) =>
      part
        .slice(1, -1)
        .split(",")
        .map(Number)
        .map((i) => solutionBitLength - 1 - i)
        .reduce((acc, curr) => acc + 2 ** curr, 0),
    );
    return { solution, buttons };
  });
}

function parseInputIndices(input: string): ParsedLineIndices[] {
  return input.split("\n").map((line) => {
    const parts = line.trim().split(" ");
    const solution = parts.at(-1)!.slice(1, -1).split(",").map(Number);
    const buttons = parts
      .slice(1, -1)
      .map((part) => part.slice(1, -1).split(",").map(Number))
      .map((n) => solution.map((_, idx) => Number(n.includes(idx))));
    return { solution, buttons };
  });
}

function solveLineLights(line: ParsedLineBinary): number {
  const { solution, buttons } = line;
  const queue: Array<{ state: number; presses: number }> = [
    { state: 0, presses: 0 },
  ];
  const seenStates = new Set<number>();
  while (queue.length > 0) {
    const { state, presses } = queue.shift()!;
    if (state === solution) {
      return presses;
    }
    for (const button of buttons) {
      const newState = state ^ button;
      if (!seenStates.has(newState)) {
        seenStates.add(newState);
        queue.push({ state: newState, presses: presses + 1 });
      }
    }
  }
  throw new Error("No solution found");
}

// Part 1
function solveLights(input: string): number {
  const lines = parseInputBinary(input);
  let totalPresses = 0;
  for (const line of lines) {
    totalPresses += solveLineLights(line);
  }
  return totalPresses;
}

const glpk = GLPK();
const glpkOptions = {
  msglev: glpk.GLP_MSG_OFF,
  presol: true,
};

function solveLineJoltage(line: ParsedLineIndices): number {
  const { solution, buttons } = line;

  const problem: LP = {
    name: "LP",
    objective: {
      direction: glpk.GLP_MIN,
      name: "obj",
      vars: buttons.map((v, i) => ({
        name: `x${i}`,
        coef: 1,
      })),
    },
    subjectTo: solution.map((val, j) => ({
      name: `c${j}`,
      vars: buttons.map((v, i) => ({
        name: `x${i}`,
        coef: buttons[i][j],
      })),
      bnds: {
        type: glpk.GLP_FX,
        ub: val,
        lb: val,
      },
    })),
    bounds: buttons.map((_, i) => ({
      name: `x${i}`,
      type: glpk.GLP_LO,
      lb: 0,
      ub: Infinity,
    })),
    generals: buttons.map((_, i) => `x${i}`),
  };

  const result = glpk.solve(problem, glpkOptions);
  if (result.result.status === glpk.GLP_OPT) {
    return result.result.z;
  }

  throw new Error("No solution found");
}

// Part 2
function solveJoltage(input: string): number {
  const lines = parseInputIndices(input);
  let totalPresses = 0;
  for (const line of lines) {
    totalPresses += solveLineJoltage(line);
  }
  return totalPresses;
}

console.log("Test 1:", solveLights(testInput), "==", testAnswer1);
console.log("Part 1:", solveLights(input));

console.log("Test 2:", solveJoltage(testInput), "==", testAnswer2);
console.log("Part 2:", solveJoltage(input));
