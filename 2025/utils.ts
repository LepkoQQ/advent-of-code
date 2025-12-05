import fs from "node:fs";
import path from "node:path";

export function loadInput(scriptUrl: string): string {
  return fs
    .readFileSync(
      path.join(path.dirname(new URL(scriptUrl).pathname), "input.txt"),
      "utf-8",
    )
    .trim();
}

export function dirs4(): [number, number][] {
  return [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];
}

export function dirs8(): [number, number][] {
  return [
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
  ];
}
