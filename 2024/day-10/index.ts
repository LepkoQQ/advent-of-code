import { dirs4, loadInput } from "../utils"

const input = loadInput(import.meta.url)

console.log("day-10")

const lines = input.split("\n")
const width = lines[0].length
const size = lines.length * width

function findTrailheads(
  out: Set<string>,
  x: number,
  y: number,
  elevation: number,
) {
  for (const [dx, dy] of dirs4()) {
    let x2 = x + dx
    let y2 = y + dy

    if (x2 >= 0 && x2 < width && y2 >= 0 && y2 < lines.length) {
      const newElevation = parseInt(lines[y2][x2], 10)

      if (newElevation === elevation + 1) {
        if (newElevation === 9) {
          out.add(`${x2},${y2}`)
          continue
        }

        findTrailheads(out, x2, y2, newElevation)
      }
    }
  }
}

let score = 0

for (let i = 0; i < size; i++) {
  const x = i % width
  const y = Math.floor(i / width)
  const char = lines[y][x]

  if (char === "0") {
    let out = new Set<string>()
    findTrailheads(out, x, y, 0)
    score += out.size
  }
}

console.log("Part 1:", score)

function findTrailheadRanking(
  out: object,
  x: number,
  y: number,
  elevation: number,
) {
  for (const [dx, dy] of dirs4()) {
    let x2 = x + dx
    let y2 = y + dy

    if (x2 >= 0 && x2 < width && y2 >= 0 && y2 < lines.length) {
      const newElevation = parseInt(lines[y2][x2], 10)

      if (newElevation === elevation + 1) {
        if (newElevation === 9) {
          if (out[`${x2},${y2}`] === undefined) {
            out[`${x2},${y2}`] = 0
          }
          out[`${x2},${y2}`] += 1
          continue
        }

        findTrailheadRanking(out, x2, y2, newElevation)
      }
    }
  }
}

let ranking = 0

for (let i = 0; i < size; i++) {
  const x = i % width
  const y = Math.floor(i / width)
  const char = lines[y][x]

  if (char === "0") {
    let out: Record<string, number> = {}
    findTrailheadRanking(out, x, y, 0)
    ranking += Object.values(out).reduce((a, b) => a + b, 0)
  }
}

console.log("Part 2:", ranking)
