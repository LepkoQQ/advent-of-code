import { loadInput } from "../utils"

const input = loadInput(import.meta.url)

console.log("day-04")

const lines = input.split("\n")
const width = lines[0].length
const height = lines.length

function findWordInDirection(
  word: string,
  x: number,
  y: number,
  dx: number,
  dy: number,
) {
  for (let i = 0; i < word.length; i++) {
    const line = lines[y + dy * i]
    if (!line) {
      return false
    }
    const char = line[x + dx * i]
    if (char !== word[i]) {
      return false
    }
  }
  return true
}

let times = 0
const word = "XMAS"

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (findWordInDirection(word, x, y, 1, 0)) {
      times++
    }
    if (findWordInDirection(word, x, y, -1, 0)) {
      times++
    }
    if (findWordInDirection(word, x, y, 0, 1)) {
      times++
    }
    if (findWordInDirection(word, x, y, 0, -1)) {
      times++
    }
    if (findWordInDirection(word, x, y, 1, 1)) {
      times++
    }
    if (findWordInDirection(word, x, y, -1, 1)) {
      times++
    }
    if (findWordInDirection(word, x, y, 1, -1)) {
      times++
    }
    if (findWordInDirection(word, x, y, -1, -1)) {
      times++
    }
  }
}

console.log("Part 1:", times)

function findCrossMas(x: number, y: number) {
  if (lines[y][x] === "A") {
    if (
      (lines[y - 1]?.[x - 1] === "M" && lines[y + 1]?.[x + 1] === "S") ||
      (lines[y - 1]?.[x - 1] === "S" && lines[y + 1]?.[x + 1] === "M")
    ) {
      if (
        (lines[y - 1]?.[x + 1] === "M" && lines[y + 1]?.[x - 1] === "S") ||
        (lines[y - 1]?.[x + 1] === "S" && lines[y + 1]?.[x - 1] === "M")
      ) {
        return true
      }
    }
  }
  return false
}

let times2 = 0

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (findCrossMas(x, y)) {
      times2++
    }
  }
}

console.log("Part 2:", times2)
