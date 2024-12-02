import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

const inputFile = fileURLToPath(
  path.join(path.dirname(import.meta.url), "input.txt")
);
const input = fs.readFileSync(inputFile, "utf8");

const [state, instructions] = input.trimEnd().split("\n\n");

function buildStacks() {
  const stacks = [];
  for (const line of state.split("\n")) {
    if (line.includes("[")) {
      for (let i = 1; i < line.length; i += 4) {
        const column = (i - 1) / 4;
        const item = line[i];
        if (item.trim()) {
          stacks[column] = stacks[column] ?? [];
          stacks[column].unshift(item);
        }
      }
    }
  }
  return stacks;
}

const stacks = buildStacks();

for (const inst of instructions.split("\n")) {
  const re = /move (?<num>\d+) from (?<from>\d+) to (?<to>\d+)/;
  const match = re.exec(inst);
  const { num, from, to } = match.groups;
  const count = Number(num);
  const fromIndex = Number(from) - 1;
  const toIndex = Number(to) - 1;

  for (let i = 0; i < count; i++) {
    const item = stacks[fromIndex].pop();
    stacks[toIndex].push(item);
  }
}

const topItems = stacks.map((stack) => stack.at(-1));

console.log("part 1:", topItems.join(""));

const stacks2 = buildStacks();

for (const inst of instructions.split("\n")) {
  const re = /move (?<num>\d+) from (?<from>\d+) to (?<to>\d+)/;
  const match = re.exec(inst);
  const { num, from, to } = match.groups;
  const count = Number(num);
  const fromIndex = Number(from) - 1;
  const toIndex = Number(to) - 1;

  const items = stacks2[fromIndex].splice(stacks2[fromIndex].length - count, count);
  stacks2[toIndex].push(...items);
}

const topItems2 = stacks2.map((stack) => stack.at(-1));

console.log("part 2:", topItems2.join(""));
