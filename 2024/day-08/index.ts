import { loadInput } from "../utils"

const input = loadInput(import.meta.url)

console.log("day-08")

const lines = input.split("\n")
const width = lines[0].length
const size = lines.length * width

let linesCopy = [...lines]

function calculateAntinodes(harmonics = false) {
  const antinodes = new Set<string>()

  for (let i = 0; i < size; i++) {
    const x1 = i % width
    const y1 = Math.floor(i / width)

    if (lines[y1][x1] === "." || lines[y1][x1] === "#") {
      continue
    }

    jloop: for (let j = 0; j < size; j++) {
      const x2 = j % width
      const y2 = Math.floor(j / width)

      if (i === j || lines[y2][x2] !== lines[y1][x1]) {
        continue
      }

      const dX = x2 - x1
      const dY = y2 - y1

      let aX = x1 - dX
      let aY = y1 - dY

      if (harmonics) {
        antinodes.add(`${x1},${y1}`)
        antinodes.add(`${x2},${y2}`)
      }

      do {
        if (aX < 0 || aX >= width || aY < 0 || aY >= lines.length) {
          continue jloop
        }

        antinodes.add(`${aX},${aY}`)

        aX -= dX
        aY -= dY
      } while (harmonics)
    }
  }

  return antinodes
}

console.log("Part 1:", calculateAntinodes().size)

console.log("Part 2:", calculateAntinodes(true).size)
