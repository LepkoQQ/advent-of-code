import { loadInput } from "../utils";

const input = loadInput(import.meta.url);
const testInput1 = `
aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out
`.trim();
const testAnswer1 = 5;
const testInput2 = `
svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out
`.trim();
const testAnswer2 = 2;

console.log("day-11");

function parseInput(input: string): Map<string, string[]> {
  const graph = new Map<string, string[]>();
  const lines = input.split("\n");
  for (const line of lines) {
    const [device, outputsStr] = line.split(": ");
    const outputs = outputsStr.split(" ");
    graph.set(device, outputs);
  }
  return graph;
}

function findPaths(
  input: string,
  from: string,
  includes: string[] = [],
): number {
  const graph = parseInput(input);

  let pathCount = 0;
  const memo = new Map<string, number>();

  function dfs(node: string, visited: Set<string>): number {
    const key = `${node}|${[...visited].sort().join(",")}`;
    if (memo.has(key)) {
      return memo.get(key)!;
    }

    if (node === "out") {
      const allIncluded = includes.every((inc) => visited.has(inc));
      return allIncluded ? 1 : 0;
    }

    let totalPaths = 0;
    for (const output of graph.get(node) || []) {
      const newVisited = new Set(visited);
      if (includes.includes(output)) {
        newVisited.add(output);
      }
      totalPaths += dfs(output, newVisited);
    }

    memo.set(key, totalPaths);
    return totalPaths;
  }

  pathCount = dfs(from, new Set<string>());

  return pathCount;
}

let from1 = "you";
console.log("Test 1:", findPaths(testInput1, from1), "==", testAnswer1);
console.log("Part 1:", findPaths(input, from1));

let from2 = "svr";
let inc = ["dac", "fft"];
console.log("Test 2:", findPaths(testInput2, from2, inc), "==", testAnswer2);
console.log("Part 2:", findPaths(input, from2, inc));
