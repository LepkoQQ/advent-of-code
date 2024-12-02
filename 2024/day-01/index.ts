import { loadInput } from "../utils"

const input = loadInput(import.meta.url)

console.log("day-01")

const numbers = input
  .split("\n")
  .map((line) => line.split(/\s+/).map((s) => parseInt(s, 10)))

const list1: number[] = []
const list2: number[] = []

numbers.forEach(([n1, n2]) => {
  list1.push(n1)
  list2.push(n2)
})

list1.sort((a, b) => a - b)
list2.sort((a, b) => a - b)

const diffList: number[] = []

for (let i = 0; i < list1.length; i++) {
  const diff = Math.abs(list1[i] - list2[i])
  diffList.push(diff)
}

const diffSum = diffList.reduce((acc, diff) => acc + diff, 0)

console.log("Part 1:", diffSum)

let diff = 0

for (let i = 0; i < list1.length; i++) {
  const times_in_list2 = list2.filter((n) => n === list1[i]).length
  diff += list1[i] * times_in_list2
}

console.log("Part 2:", diff)
