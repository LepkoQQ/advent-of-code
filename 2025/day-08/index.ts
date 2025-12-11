import { loadInput } from "../utils";

const input = loadInput(import.meta.url);
const testInput = `
162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689
`.trim();
const testAnswer1 = 40;
const testAnswer2 = 25272;

console.log("day-08");

type Point = { x: number; y: number; z: number; cid: number };
type DistancePairs = { p1: Point; p2: Point; distance: number };

function parseInput(input: string): Point[] {
  return input.split("\n").map((line, i) => {
    const [x, y, z] = line.split(",").map(Number);
    return { x, y, z, cid: i };
  });
}

function getDistance(p1: Point, p2: Point): number {
  return Math.sqrt(
    Math.pow(p2.x - p1.x, 2) +
      Math.pow(p2.y - p1.y, 2) +
      Math.pow(p2.z - p1.z, 2),
  );
}

function findClosestPairs(points: Point[]): DistancePairs[] {
  let pairs: DistancePairs[] = [];

  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const p1 = points[i];
      const p2 = points[j];
      const distance = getDistance(p1, p2);
      pairs.push({ p1, p2, distance });
    }
  }

  return pairs.sort((a, b) => a.distance - b.distance);
}

function countCircuits(points: Point[]): Record<number, Point[]> {
  const circuits: Record<number, Point[]> = {};
  points.forEach((p) => {
    circuits[p.cid] = circuits[p.cid] || [];
    circuits[p.cid].push(p);
  });
  return circuits;
}

function connectPoints(input: string, num: number): number {
  const points = parseInput(input);
  const closestPairs = findClosestPairs(points);

  let lastPair: DistancePairs | null = null;

  for (let i = 0; i < num; i++) {
    const { p1, p2 } = closestPairs[i];
    const p2cid = p2.cid;
    points.forEach((p) => {
      if (p.cid === p2cid) {
        p.cid = p1.cid;
      }
    });
    // Part 2
    if (num === Infinity) {
      const circuits = countCircuits(points);
      if (Object.keys(circuits).length === 1) {
        lastPair = closestPairs[i];
        break;
      }
    }
  }

  if (num === Infinity) {
    // Part 2
    return lastPair!.p1.x * lastPair!.p2.x;
  } else {
    // Part 1
    const circuits = countCircuits(points);
    return Object.values(circuits)
      .map((c) => c.length)
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a * b, 1);
  }
}

console.log("Test 1:", connectPoints(testInput, 10), "==", testAnswer1);
console.log("Part 1:", connectPoints(input, 1000));

console.log("Test 2:", connectPoints(testInput, Infinity), "==", testAnswer2);
console.log("Part 2:", connectPoints(input, Infinity));
