import { loadInput } from "../utils";

const input = loadInput(import.meta.url);
const testInput = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32
`.trim();
const testAnswer1 = 3;
const testAnswer2 = 14;

console.log("day-05");

type Range = { start: number; end: number };

function parseInput(input: string): { ranges: Range[]; ids: number[] } {
  const [rangeStrings, idStrings] = input
    .split("\n\n")
    .map((section) => section.split("\n"));
  const ranges = rangeStrings.map((line) => {
    const [start, end] = line.split("-").map(Number);
    return { start, end };
  });
  const ids = idStrings.map(Number);
  return { ranges, ids };
}

// Part 1
function freshIngredients(input: string): number {
  const { ranges, ids } = parseInput(input);

  let count = 0;

  for (const id of ids) {
    let isFresh = false;
    for (const range of ranges) {
      if (id >= range.start && id <= range.end) {
        isFresh = true;
        break;
      }
    }
    if (isFresh) {
      count++;
    }
  }

  return count;
}

function rangesOverlap(range1: Range, range2: Range): boolean {
  return range1.start <= range2.end && range2.start <= range1.end;
}

function mergeRanges(range1: Range, range2: Range): Range {
  return {
    start: Math.min(range1.start, range2.start),
    end: Math.max(range1.end, range2.end),
  };
}

// Part 2
function numberOfFreshIngredients(input: string): number {
  const { ranges } = parseInput(input);
  const sortedRanges = ranges.sort((a, b) => a.start - b.start);

  const finalRanges: Range[] = [];

  for (const range of sortedRanges) {
    let merged = false;
    for (const finalRange of finalRanges) {
      if (rangesOverlap(range, finalRange)) {
        const mergedRange = mergeRanges(range, finalRange);
        finalRange.start = mergedRange.start;
        finalRange.end = mergedRange.end;
        merged = true;
        break;
      }
    }
    if (!merged) {
      finalRanges.push(range);
    }
  }

  let count = 0;
  for (const range of finalRanges) {
    count += range.end - range.start + 1;
  }

  return count;
}

console.log("Test 1:", freshIngredients(testInput), "==", testAnswer1);
console.log("Part 1:", freshIngredients(input));

console.log("Test 2:", numberOfFreshIngredients(testInput), "==", testAnswer2);
console.log("Part 2:", numberOfFreshIngredients(input));
