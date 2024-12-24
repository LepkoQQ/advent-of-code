import { loadInput } from "../utils"

const input = loadInput(import.meta.url)

console.log("day-11")

const stones = input.split(" ").map((n) => parseInt(n, 10))

function blink1(stone: number): number[] {
  const stoneStr = String(stone)
  if (stone === 0) {
    return [1]
  } else if (stoneStr.length % 2 === 0) {
    const half = stoneStr.length / 2
    const left = parseInt(stoneStr.slice(0, half), 10)
    const right = parseInt(stoneStr.slice(half), 10)
    return [left, right]
  } else {
    return [stone * 2024]
  }
}

function blink(stones: number[]): number[] {
  const newStones: number[] = []
  for (const stone of stones) {
    newStones.push(...blink1(stone))
  }
  return newStones
}

let stones1 = [...stones]

for (let i = 0; i < 25; i++) {
  stones1 = blink(stones1)
}

console.log("Part 1:", stones1.length)

let stoneMap = new Map<number, number>()
for (const stone of stones) {
  const n = stoneMap.get(stone) || 0
  stoneMap.set(stone, n + 1)
}

for (let i = 0; i < 75; i++) {
  let newStoneMap = new Map<number, number>()
  for (const [stone, count] of stoneMap) {
    const newStones = blink1(stone)
    for (const newStone of newStones) {
      const n = newStoneMap.get(newStone) || 0
      newStoneMap.set(newStone, n + count)
    }
  }
  stoneMap = newStoneMap
}

const sum = Array.from(stoneMap.values()).reduce((acc, n) => acc + n, 0)

console.log("Part 2:", sum)
