import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

const inputFile = fileURLToPath(
  path.join(path.dirname(import.meta.url), "input.txt")
);
const input = fs.readFileSync(inputFile, "utf8");

const caloriesList = input.trim().split("\n\n");
const summedCalories = caloriesList.map((input) =>
  input
    .split("\n")
    .map((n) => Number.parseInt(n, 10))
    .reduce((prev, curr) => prev + curr, 0)
);

const maxCalories = Math.max(...summedCalories);

console.log("part 1:", maxCalories);

const topThreeSummed = summedCalories
  .slice()
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((prev, curr) => prev + curr, 0);

console.log("part 2:", topThreeSummed);
