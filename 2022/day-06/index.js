import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

const inputFile = fileURLToPath(
  path.join(path.dirname(import.meta.url), "input.txt")
);
const input = fs.readFileSync(inputFile, "utf8");

const data = input.trim();

let startOfPacket = -1;
for (let i = 4; i < data.length; i++) {
  const last4 = data.slice(i - 4, i);
  if (new Set([...last4]).size === 4) {
    startOfPacket = i;
    break;
  }
}

console.log("part 1:", startOfPacket);

let startOfMessage = -1;
for (let i = 14; i < data.length; i++) {
  const last14 = data.slice(i - 14, i);
  if (new Set([...last14]).size === 14) {
    startOfMessage = i;
    break;
  }
}

console.log("part 2:", startOfMessage);
