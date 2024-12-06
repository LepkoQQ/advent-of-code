import { dirs4, loadInput } from "../utils"

const input = loadInput(import.meta.url)

console.log("day-06")

const rows = input.split("\n")
const dirs = dirs4()
const dirChars = ["^", ">", "v", "<"]

function solve(rows, includeDir = false): [Set<string>, boolean] {
  let dir = "^"
  let posY = rows.findIndex((row) => row.includes("^"))
  let posX = rows[posY].indexOf("^")

  const visited = new Set<string>()

  while (true) {
    if (posX >= rows[0].length || posY >= rows.length || posX < 0 || posY < 0) {
      if (includeDir) {
        throw new Error("Escaped")
      }
      break
    }
    if (includeDir) {
      if (visited.has(`${posX},${posY},${dir}`)) {
        return [visited, true]
      }
      visited.add(`${posX},${posY},${dir}`)
    } else {
      visited.add(`${posX},${posY}`)
    }

    const dirIdx = dirChars.findIndex((c) => c === dir)
    const [dx, dy] = dirs[dirIdx]
    const nextCell = rows[posY + dy]?.[posX + dx]
    if (nextCell == undefined) {
      break
    } else if (nextCell !== "#") {
      posY += dy
      posX += dx
    } else {
      dir = dirChars[(dirIdx + 1) % 4]
    }
  }

  return [visited, false]
}

const [visited] = solve(rows)

console.log("Part 1:", visited.size)

let count = 0

for (let i = 0; i < rows.length; i++) {
  for (let j = 0; j < rows[i].length; j++) {
    if (rows[i][j] !== ".") {
      continue
    }
    const newRows = input.split("\n")
    newRows[i] = newRows[i].slice(0, j) + "#" + newRows[i].slice(j + 1)

    const [_, loop] = solve(newRows, true)
    if (loop) {
      count++
    }
  }
}

console.log("Part 2:", count)
