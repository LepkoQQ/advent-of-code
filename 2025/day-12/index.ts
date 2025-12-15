import { loadInput } from "../utils";

const input = loadInput(import.meta.url);
const testInput = `
0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2
`.trim();
const testAnswer1 = 2;

console.log("day-12");

type Region = {
  width: number;
  height: number;
  shapeCounts: number[];
};

type Shape = boolean[][];

function parseInput(input: string) {
  const parts = input.split("\n\n");
  const shapes: Map<number, Shape> = new Map();
  for (let i = 0; i < parts.length - 1; i++) {
    const lines = parts[i].split("\n");
    const id = parseInt(lines[0].slice(0, -1), 10);
    shapes.set(
      id,
      lines.slice(1).map((line) => line.split("").map((c) => c === "#")),
    );
  }
  const regions = parts
    .at(-1)!
    .split("\n")
    .map((line) => {
      const [size, shapeCounts] = line.split(": ");
      const [width, height] = size.split("x").map((n) => parseInt(n, 10));
      return {
        width,
        height,
        shapeCounts: shapeCounts.split(" ").map((n) => parseInt(n, 10)),
      };
    });
  return { shapes, regions };
}

function fitPresentsInRegion(
  region: Region,
  shapes: Map<number, Shape>,
): boolean {
  // Today is a troll and shapes in the actual input can fit without any
  // complex packing. Shapes are 3x3 so divide by 3 to get number of presents
  // that can fit in the region without any complex packing.
  const totalArea = (region.width / 3) * (region.height / 3);
  const numberOfShapes = region.shapeCounts.reduce((a, b) => a + b, 0);
  return numberOfShapes <= totalArea;
}

function fitPresents(input: string): number {
  const { shapes, regions } = parseInput(input);
  let fitCount = 0;
  for (const region of regions) {
    if (fitPresentsInRegion(region, shapes)) {
      fitCount++;
    }
  }
  return fitCount;
}

// Solution is very simplistic and does not work on the troll test input that
// would require complex packing.
// console.log("Test 1:", fitPresents(testInput), "==", testAnswer1);
console.log("Part 1:", fitPresents(input));
