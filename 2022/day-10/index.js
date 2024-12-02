import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

const inputFile = fileURLToPath(
  path.join(path.dirname(import.meta.url), "input.txt")
);
const input = fs.readFileSync(inputFile, "utf8");

const insns = input
  .trim()
  .split("\n")
  .map((l) => {
    const [i, v] = l.split(" ");
    let value = null;
    let cycles = 1;
    if (i === "addx") {
      cycles = 2;
      value = Number(v);
    }
    return {
      insn: i,
      value,
      cycles,
    };
  });

let regX = 1;
let cycle = 1;

const signalStrengths = [];

for (const insn of insns) {
  for (let i = 0; i < insn.cycles; i++) {
    if ((cycle - 20) % 40 === 0) {
      signalStrengths.push(cycle * regX);
    }
    if (i === insn.cycles - 1) {
      if (insn.insn === "addx") {
        regX += insn.value;
      }
    }
    cycle++;
  }
}

const ssSum = signalStrengths.reduce((prev, curr) => prev + curr, 0);

console.log("part 1:", ssSum);

regX = 1;
cycle = 1;
const scanlines = [[]];

for (const insn of insns) {
  for (let i = 0; i < insn.cycles; i++) {
    const lineX = cycle % 40;
    const spriteX = lineX - 1;
    if (spriteX >= regX - 1 && spriteX <= regX + 1) {
      scanlines.at(-1).push("#");
    } else {
      scanlines.at(-1).push(".");
    }
    if (lineX === 0) {
      scanlines.push([]);
    }

    if (i === insn.cycles - 1) {
      if (insn.insn === "addx") {
        regX += insn.value;
      }
    }
    cycle++;
  }
}

console.log("part 2:");
console.log(scanlines.map((l) => l.join("")).join("\n"));
