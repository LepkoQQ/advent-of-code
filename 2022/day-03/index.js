import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

const inputFile = fileURLToPath(
  path.join(path.dirname(import.meta.url), "input.txt")
);
const input = fs.readFileSync(inputFile, "utf8");

const rucksackItems = input.trim().split("\n");

const itemsInBoth = rucksackItems.map((items) => {
  const half = items.length / 2;
  const left = items.slice(0, half);
  const right = items.slice(half);
  for (const item of left) {
    if (right.includes(item)) return item;
  }
});

function getPriority(item) {
  const charCode = item.charCodeAt(0);
  if (charCode > 96) {
    return charCode - 96;
  }
  return charCode - 38;
}

const priorities = itemsInBoth.map(getPriority);

const prioSum = priorities.reduce((prev, curr) => prev + curr, 0);

console.log("part 1:", prioSum);

const threes = [];
for (let i = 0; i < rucksackItems.length; i += 3) {
  threes.push(rucksackItems.slice(i, i + 3));
}

const badges = threes.map((three) => {
  const sorted = three.slice().sort((a, b) => b.length - a.length);
  for (const item of sorted[0]) {
    if (sorted[1].includes(item) && sorted[2].includes(item)) {
      return item;
    }
  }
});

const badgePriorities = badges.map(getPriority);
const badgePrioSum = badgePriorities.reduce((prev, curr) => prev + curr, 0);

console.log("part 2:", badgePrioSum);
