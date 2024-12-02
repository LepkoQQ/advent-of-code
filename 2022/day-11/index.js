import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

const inputFile = fileURLToPath(
  path.join(path.dirname(import.meta.url), "input.txt")
);
const input = fs.readFileSync(inputFile, "utf8");

function getInitialMonkeys() {
  return input
    .trim()
    .split("\n\n")
    .map((monkeyInput) => {
      const lines = monkeyInput.split("\n").map((l) => l.trim());

      return {
        items: lines[1]
          .split(": ")[1]
          .split(", ")
          .map((n) => Number(n)),
        op: lines[2].split(": ")[1],
        test_div: Number(lines[3].split("divisible by ")[1]),
        test_true: Number(lines[4].split("throw to monkey ")[1]),
        test_false: Number(lines[5].split("throw to monkey ")[1]),
        inspections: 0,
      };
    });
}

const monkeys = getInitialMonkeys();

// common multiple
const lcm = monkeys
  .map((m) => m.test_div)
  .reduce((prev, curr) => prev * curr, 1);

function evalOp(old, op) {
  var new_;
  eval(op.replaceAll("new", "new_"));
  return new_;
}

function completeRound(monkeys, divideWorry) {
  for (const monkey of monkeys) {
    if (divideWorry) {
      monkey.items = monkey.items.map((item) => evalOp(item, monkey.op));
      monkey.items = monkey.items.map((item) => Math.floor(item / 3));
    } else {
      monkey.items = monkey.items.map((item) => evalOp(item, monkey.op));
      monkey.items = monkey.items.map((item) => Math.floor(item % lcm));
    }

    monkey.inspections += monkey.items.length;

    for (let i = 0; i < monkey.items.length; i++) {
      const item = monkey.items[i];
      if (item % monkey.test_div === 0) {
        monkeys[monkey.test_true].items.push(item);
      } else {
        monkeys[monkey.test_false].items.push(item);
      }
    }

    monkey.items = [];
  }
}

for (let i = 0; i < 20; i++) {
  completeRound(monkeys, true);
}

const monkeyInspections = monkeys
  .map((m) => m.inspections)
  .slice()
  .sort((a, b) => b - a);

const topInspections = monkeyInspections.slice(0, 2);
const monkeyBusiness = topInspections[0] * topInspections[1];

console.log("part 1:", monkeyBusiness);

const monkeys2 = getInitialMonkeys();

for (let i = 0; i < 10000; i++) {
  completeRound(monkeys2, false);
}

const monkeyInspections2 = monkeys2
  .map((m) => m.inspections)
  .slice()
  .sort((a, b) => b - a);

const topInspections2 = monkeyInspections2.slice(0, 2);
const monkeyBusiness2 = topInspections2[0] * topInspections2[1];

console.log("part 2:", monkeyBusiness2);
