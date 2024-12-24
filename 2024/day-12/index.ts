import { dirs4, loadInput } from "../utils"

const input = loadInput(import.meta.url)

console.log("day-12")

const lines = input.split("\n")

const seen = new Set<string>()

type Region = {
  type: string
  coords: number[][]
}

const regions: Region[] = []

function searchArea(region: Region, x: number, y: number) {
  if (seen.has(`${x},${y}`)) {
    return
  }

  seen.add(`${x},${y}`)
  region.coords.push([x, y])

  for (const [dx, dy] of dirs4()) {
    const x2 = x + dx
    const y2 = y + dy
    const char2 = lines[y2]?.[x2]
    if (char2 === region.type && !seen.has(`${x2},${y2}`)) {
      searchArea(region, x2, y2)
    }
  }
}

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    if (!seen.has(`${x},${y}`)) {
      const region = {
        type: lines[y][x],
        coords: [],
      }
      searchArea(region, x, y)
      regions.push(region)
    }
  }
}

let price = 0
let price2 = 0

for (const region of regions) {
  const minX = Math.min(...region.coords.map((c) => c[0]))
  const maxX = Math.max(...region.coords.map((c) => c[0]))
  const minY = Math.min(...region.coords.map((c) => c[1]))
  const maxY = Math.max(...region.coords.map((c) => c[1]))

  const topEdge = new Set<string>()
  const bottomEdge = new Set<string>()
  const leftEdge = new Set<string>()
  const rightEdge = new Set<string>()

  let edges = 0
  let sides = 0

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const char = lines[y]?.[x]
      if (
        char === region.type &&
        region.coords.some((c) => c[0] === x && c[1] === y)
      ) {
        for (const [dx, dy] of dirs4()) {
          const char2 = lines[y + dy]?.[x + dx]
          if (char2 !== region.type) {
            edges++

            if (dx > 0 && dy === 0) {
              rightEdge.add(`${x},${y}`)
            }
            if (dx < 0 && dy === 0) {
              leftEdge.add(`${x},${y}`)
            }
            if (dx === 0 && dy > 0) {
              bottomEdge.add(`${x},${y}`)
            }
            if (dx === 0 && dy < 0) {
              topEdge.add(`${x},${y}`)
            }
          }
        }
      }
    }
  }

  price += region.coords.length * edges

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const curr = `${x},${y}`
      const last = `${x - 1},${y}`
      if (topEdge.has(curr) && !topEdge.has(last)) {
        sides++
      }
      if (bottomEdge.has(curr) && !bottomEdge.has(last)) {
        sides++
      }
    }
  }

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      const curr = `${x},${y}`
      const last = `${x},${y - 1}`
      if (leftEdge.has(curr) && !leftEdge.has(last)) {
        sides++
      }
      if (rightEdge.has(curr) && !rightEdge.has(last)) {
        sides++
      }
    }
  }

  price2 += region.coords.length * sides
}

console.log("Part 1:", price)

console.log("Part 2:", price2)
