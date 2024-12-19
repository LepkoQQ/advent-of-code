import { loadInput } from "../utils"

const input = loadInput(import.meta.url)

console.log("day-07")

const calculations = input.split("\n").map((line) => {
  const [result, numbers] = line.split(": ")
  return {
    result: parseInt(result, 10),
    numbers: numbers.split(" ").map((n) => parseInt(n, 10)),
  }
})

function isValidCalculation(operators: string[]) {
  return ({ result, numbers }: { result: number; numbers: number[] }) => {
    // check all possible combinations of operators
    for (let i = 0; i < operators.length ** (numbers.length - 1); i++) {
      let usedNumbers = [...numbers]
      let operatorCombination = i
        .toString(operators.length)
        .padStart(usedNumbers.length - 1, "0")
        .split("")
        .map((o) => operators[parseInt(o, operators.length)])

      let res = usedNumbers[0]
      for (let j = 0; j < operatorCombination.length; j++) {
        switch (operatorCombination[j]) {
          case "+":
            res += usedNumbers[j + 1]
            break
          case "x":
            res *= usedNumbers[j + 1]
            break
          case "||":
            res = parseInt(`${res}${usedNumbers[j + 1]}`, 10)
            break
        }
      }

      if (res === result) {
        return true
      }
    }
    return false
  }
}

const validCalculations = calculations.filter(isValidCalculation(["x", "+"]))
const sum = validCalculations.reduce((acc, { result }) => acc + result, 0)

console.log("Part 1:", sum)

const validCalculations2 = calculations.filter(
  isValidCalculation(["x", "+", "||"]),
)
const sum2 = validCalculations2.reduce((acc, { result }) => acc + result, 0)

console.log("Part 2:", sum2)
