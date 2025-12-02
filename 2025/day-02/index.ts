import { loadInput } from "../utils";

const input = loadInput(import.meta.url);

const testInput = `
11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124
`;
const testAnswer1 = 1227775554;
const testAnswer2 = 4174379265;

console.log("day-02");

function invalidIDsInRange(rangeStr: string, repeatAny: boolean): Set<number> {
  const [startStr, endStr] = rangeStr.split("-");
  const start = Number(startStr);
  const end = Number(endStr);
  const invalidIDs = new Set<number>();

  for (let i = start; i <= end; i++) {
    const idStr = i.toString();

    // Part 1
    const middle = idStr.length / 2;
    const firstHalf = idStr.slice(0, middle);
    const secondHalf = idStr.slice(middle);

    if (firstHalf === secondHalf) {
      invalidIDs.add(i);
    }

    // Part 2
    if (repeatAny) {
      for (let size = 1; size <= middle; size++) {
        if (idStr.length % size !== 0) continue;
        const firstPart = idStr.slice(0, size);
        const expanded = firstPart.padEnd(idStr.length, firstPart);
        if (expanded === idStr) {
          invalidIDs.add(i);
          break;
        }
      }
    }
  }

  return invalidIDs;
}

function sumInvalidIDs(inputStr: string, repeatAny: boolean = false): number {
  const ranges = inputStr.trim().split(",");
  let invalidIDs: number[] = [];

  for (const range of ranges) {
    invalidIDs.push(...invalidIDsInRange(range, repeatAny));
  }

  return invalidIDs.reduce((prev, curr) => prev + curr, 0);
}

console.log("Test 1:", sumInvalidIDs(testInput), "==", testAnswer1);
console.log("Part 1:", sumInvalidIDs(input));

console.log("Test 2:", sumInvalidIDs(testInput, true), "==", testAnswer2);
console.log("Part 2:", sumInvalidIDs(input, true));
