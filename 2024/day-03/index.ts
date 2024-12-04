import { loadInput } from "../utils"

const input = loadInput(import.meta.url)

console.log("day-03")

const muls = [...input.matchAll(/mul\(\d{1,3},\d{1,3}\)/g)]

let sum = 0

for (const mul of muls) {
  const [a, b] = mul[0].slice(4, -1).split(",")
  sum += parseInt(a, 10) * parseInt(b, 10)
}

console.log("Part 1:", sum)

const dos = [...input.matchAll(/do\(\)/g)].map((m) => m.index)
const donts = [...input.matchAll(/don't\(\)/g)].map((m) => m.index)

function nearestBefore(list: number[], index: number): number {
  const listBefore = list.filter((i) => i < index)
  if (listBefore.length == 0) return 0
  return listBefore[listBefore.length - 1]
}

let sum2 = 0

for (const mul of muls) {
  const do_ = nearestBefore(dos, mul.index)
  const dont = nearestBefore(donts, mul.index)
  if (do_ >= dont) {
    const [a, b] = mul[0].slice(4, -1).split(",")
    sum2 += parseInt(a, 10) * parseInt(b, 10)
  }
}

console.log("Part 2:", sum2)
