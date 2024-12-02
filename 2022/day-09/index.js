import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

const inputFile = fileURLToPath(
  path.join(path.dirname(import.meta.url), "input.txt")
);
const input = fs.readFileSync(inputFile, "utf8");

const steps = input
  .trim()
  .split("\n")
  .map((l) => {
    const [d, s] = l.split(" ");
    return {
      dir: d,
      num: Number(s),
    };
  });

let headX = 0;
let headY = 0;
let tailX = 0;
let tailY = 0;
const tailPositions = {};

function moveHead(dX, dY) {
  const oldHeadX = headX;
  const oldHeadY = headY;
  headX += dX;
  headY += dY;

  if (Math.abs(headX - tailX) > 1 || Math.abs(headY - tailY) > 1) {
    tailX = oldHeadX;
    tailY = oldHeadY;
  }

  tailPositions[`${tailX},${tailY}`] = true;
}

for (const step of steps) {
  let dX = 0;
  let dY = 0;
  if (step.dir === "U") dY = 1;
  if (step.dir === "D") dY = -1;
  if (step.dir === "L") dX = -1;
  if (step.dir === "R") dX = 1;
  for (let i = 0; i < step.num; i++) {
    moveHead(dX, dY);
  }
}

console.log("part 1:", Object.keys(tailPositions).length);

const positions = Array(10)
  .fill()
  .map(() => ({ x: 0, y: 0 }));
let tailPositions2 = {};

function moveHead2(dX, dY) {
  let headX = (positions[0].x += dX);
  let headY = (positions[0].y += dY);
  for (let i = 1; i < positions.length; i++) {
    const tailX = positions[i].x;
    const tailY = positions[i].y;
    const diffX = headX - tailX;
    const diffY = headY - tailY;
    if (Math.abs(diffX) > 1 || Math.abs(diffY) > 1) {
      if (diffX) {
        positions[i].x += diffX > 0 ? 1 : -1;
      }
      if (diffY) {
        positions[i].y += diffY > 0 ? 1 : -1;
      }
    }
    if (i === positions.length - 1) {
      tailPositions2[`${positions[i].x},${positions[i].y}`] = true;
    } else {
      headX = positions[i].x;
      headY = positions[i].y;
    }
  }
}

let xx = 0;
for (const step of steps) {
  let dX = 0;
  let dY = 0;
  if (step.dir === "U") dY = 1;
  if (step.dir === "D") dY = -1;
  if (step.dir === "L") dX = -1;
  if (step.dir === "R") dX = 1;
  for (let i = 0; i < step.num; i++) {
    moveHead2(dX, dY);
  }
}

console.log("part 2:", Object.keys(tailPositions2).length);
