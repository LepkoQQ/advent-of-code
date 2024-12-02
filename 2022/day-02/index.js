import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

const inputFile = fileURLToPath(
  path.join(path.dirname(import.meta.url), "input.txt")
);
const input = fs.readFileSync(inputFile, "utf8");

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

const LOSS = 0;
const DRAW = 3;
const WIN = 6;

const letterToShape = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
  X: ROCK,
  Y: PAPER,
  Z: SCISSORS,
};

const strategy = input
  .trim()
  .split("\n")
  .map((line) => {
    const [opponent, me] = line.split(" ");
    return [letterToShape[opponent], letterToShape[me]];
  });

const scores = strategy.map(([opponent, me]) => {
  if (me === opponent) return DRAW + me;
  if (me === (opponent % 3) + 1) return WIN + me;
  return LOSS + me;
});

const scoreSum = scores.reduce((prev, curr) => prev + curr, 0);

console.log("part 1:", scoreSum);

const letterToResult = {
  X: LOSS,
  Y: DRAW,
  Z: WIN,
};

const correctStrategy = input
  .trim()
  .split("\n")
  .map((line) => {
    const [opponent, result] = line.split(" ");
    return [letterToShape[opponent], letterToResult[result]];
  });

const correctScores = correctStrategy.map(([opponent, result]) => {
  if (result === DRAW) return DRAW + opponent;
  if (result === WIN) return WIN + ((opponent % 3) + 1);
  return LOSS + (((opponent + 1) % 3) + 1);
});

const correctScoreSum = correctScores.reduce((prev, curr) => prev + curr, 0);

console.log("part 2:", correctScoreSum);
