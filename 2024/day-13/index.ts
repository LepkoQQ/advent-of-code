import { loadInput } from "../utils"

const input = loadInput(import.meta.url)

console.log("day-13")

const clawMachines = input.split("\n\n").map((cm) => {
  const lines = cm.split("\n")
  return {
    A: lines[0]
      .split(": ")[1]
      .split(", ")
      .map((s) => s.split("+")[1])
      .map(Number),
    B: lines[1]
      .split(": ")[1]
      .split(", ")
      .map((s) => s.split("+")[1])
      .map(Number),
    prize: lines[2]
      .split(": ")[1]
      .split(", ")
      .map((s) => s.split("=")[1])
      .map(Number),
  }
})

let tokens = 0

for (const cm of clawMachines) {
  const prizeX = cm.prize[0]
  const prizeY = cm.prize[1]

  const adX = cm.A[0]
  const adY = cm.A[1]
  const bdX = cm.B[0]
  const bdY = cm.B[1]

  let tok = Infinity

  for (let aN = 100; aN >= 0; aN--) {
    for (let bN = 100; bN >= 0; bN--) {
      const moveX = adX * aN + bdX * bN
      const moveY = adY * aN + bdY * bN

      if (moveX === prizeX && moveY === prizeY) {
        const t = aN * 3 + bN * 1
        if (t < tok) {
          tok = t
        }
      }
    }
  }

  if (tok !== Infinity) {
    tokens += tok
  }
}

console.log("Part 1:", tokens)

let tokens2 = 0

for (const cm of clawMachines) {
  const prizeX = cm.prize[0] + 10000000000000
  const prizeY = cm.prize[1] + 10000000000000

  const adX = cm.A[0]
  const adY = cm.A[1]
  const bdX = cm.B[0]
  const bdY = cm.B[1]

  let d = adX * bdY - adY * bdX
  const aN = (prizeX * bdY - prizeY * bdX) / d
  const bN = (adX * prizeY - adY * prizeX) / d

  if (aN !== Math.trunc(aN) || bN !== Math.trunc(bN)) {
    continue
  }

  if (adX * aN + bdX * bN == prizeX && adY * aN + bdY * bN == prizeY) {
    tokens2 += aN * 3 + bN * 1
  }
}

console.log("Part 2:", tokens2)
