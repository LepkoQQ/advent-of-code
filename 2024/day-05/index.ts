import { loadInput } from "../utils"

const input = loadInput(import.meta.url)

console.log("day-05")

let [rulesInput, pagesInput] = input.split("\n\n")

const orderRules = rulesInput
  .split("\n")
  .map((line) => line.split("|").map((n) => parseInt(n, 10)))

const pages = pagesInput
  .split("\n")
  .map((line) => line.split(",").map((n) => parseInt(n, 10)))

function isOrdered(pages: number[]): boolean {
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    const pagesBefore = pages.slice(0, i)
    const pagesAfter = pages.slice(i + 1)
    const rules = orderRules.filter((rule) => rule.includes(page))

    for (const [first, second] of rules) {
      if (page === first && pagesBefore.includes(second)) {
        return false
      }
      if (page === second && pagesAfter.includes(first)) {
        return false
      }
    }
  }
  return true
}

const orderedPages = pages.filter(isOrdered)
const mids = orderedPages.map((pages) => pages[Math.floor(pages.length / 2)])
const midsSum = mids.reduce((acc, n) => acc + n, 0)

console.log("Part 1:", midsSum)

const unorderedPages = pages.filter((pages) => !isOrdered(pages))

for (let p = 0; p < unorderedPages.length; p++) {
  let pages = unorderedPages[p]
  pages.sort((a, b) => {
    const rules = orderRules.filter((r) => r.includes(a) || r.includes(b))
    for (const [first, second] of rules) {
      if (a === first && b === second) {
        return -1
      }
      if (a === second && b === first) {
        return 1
      }
    }
    return 0
  })
}

const mids2 = unorderedPages.map((pages) => pages[Math.floor(pages.length / 2)])
const midsSum2 = mids2.reduce((acc, n) => acc + n, 0)

console.log("Part 2:", midsSum2)
