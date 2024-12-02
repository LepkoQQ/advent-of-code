import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

const inputFile = fileURLToPath(
  path.join(path.dirname(import.meta.url), "input.txt")
);
const input = fs.readFileSync(inputFile, "utf8");

const pairRanges = input
  .trim()
  .split("\n")
  .map((pair) =>
    pair.split(",").map((range) => {
      const [from, to] = range.split("-");
      return { from: Number.parseInt(from, 10), to: Number.parseInt(to, 10) };
    })
  );

const oneRangeFullyContainsOther = pairRanges.filter(([left, right]) => {
  return (
    (left.from <= right.from && left.to >= right.to) ||
    (right.from <= left.from && right.to >= left.to)
  );
});

console.log("part 1:", oneRangeFullyContainsOther.length);

const rangesOverlap = pairRanges.filter(([left, right]) => {
  return (
    (left.from >= right.from && left.from <= right.to) ||
    (right.from >= left.from && right.from <= left.to) ||
    (left.to >= right.from && left.to <= right.to) ||
    (right.to >= left.from && right.to <= left.to)
  );
});

console.log("part 2:", rangesOverlap.length);
