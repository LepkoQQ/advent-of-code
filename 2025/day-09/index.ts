import { loadInput } from "../utils";

const input = loadInput(import.meta.url);
const testInput = `
7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3
`.trim();
const testAnswer1 = 50;
const testAnswer2 = 24;

console.log("day-09");

type Point = { x: number; y: number };

function parseInput(input: string): Point[] {
  return input.split("\n").map((line) => {
    const [x, y] = line.split(",").map(Number);
    return { x, y };
  });
}

function rectangleArea(p1: Point, p2: Point): number {
  // add one to include both edges, rectangle cannot have zero area
  return (Math.abs(p1.x - p2.x) + 1) * (Math.abs(p1.y - p2.y) + 1);
}

function getMinMaxPerLine(
  tiles: Point[],
): Map<number, { min: number; max: number }> {
  const borderTiles = tiles.slice();
  const map = new Map<number, { min: number; max: number }>();

  for (let i = 0, j = tiles.length - 1; i < tiles.length; j = i++) {
    const start = tiles[j];
    const end = tiles[i];
    if (start.x === end.x) {
      const min = Math.min(start.y, end.y);
      const max = Math.max(start.y, end.y);
      for (let y = min; y <= max; y++) {
        borderTiles.push({ x: start.x, y });
      }
    } else if (start.y === end.y) {
      const min = Math.min(start.x, end.x);
      const max = Math.max(start.x, end.x);
      for (let x = min; x <= max; x++) {
        borderTiles.push({ x, y: start.y });
      }
    }
  }

  borderTiles.forEach((tile) => {
    if (!map.has(tile.y)) {
      map.set(tile.y, { min: tile.x, max: tile.x });
    } else {
      const entry = map.get(tile.y)!;
      if (tile.x < entry.min) {
        entry.min = tile.x;
      }
      if (tile.x > entry.max) {
        entry.max = tile.x;
      }
    }
  });

  return map;
}

function isAreaInPolygon(
  p1: Point,
  p2: Point,
  minMaxPerLine: Map<number, { min: number; max: number }>,
): boolean {
  const minX = Math.min(p1.x, p2.x);
  const maxX = Math.max(p1.x, p2.x);
  const minY = Math.min(p1.y, p2.y);
  const maxY = Math.max(p1.y, p2.y);

  for (let y = minY; y <= maxY; y++) {
    const entry = minMaxPerLine.get(y);
    if (!entry) {
      return false;
    }
    if (minX < entry.min || maxX > entry.max) {
      return false;
    }
  }

  return true;
}

function findLargestArea(
  input: string,
  insidePolygonOnly: boolean = false,
): number {
  const redTiles = parseInput(input);
  const minMaxPerLine = insidePolygonOnly
    ? getMinMaxPerLine(redTiles)
    : new Map();

  let largestArea = 0;
  for (let i = 0; i < redTiles.length - 1; i++) {
    const tileA = redTiles[i];
    for (let j = i + 1; j < redTiles.length; j++) {
      const tileB = redTiles[j];
      const area = rectangleArea(tileA, tileB);
      if (area > largestArea) {
        if (
          !insidePolygonOnly ||
          isAreaInPolygon(tileA, tileB, minMaxPerLine)
        ) {
          largestArea = area;
        }
      }
    }
  }

  return largestArea;
}

console.log("Test 1:", findLargestArea(testInput), "==", testAnswer1);
console.log("Part 1:", findLargestArea(input));

console.log("Test 2:", findLargestArea(testInput, true), "==", testAnswer2);
console.log("Part 2:", findLargestArea(input, true));
