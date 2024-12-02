import { loadInput } from "../utils"

const input = loadInput(import.meta.url)

console.log("day-02")

const reports = input
  .split("\n")
  .map((line) => line.split(/\s+/).map((s) => parseInt(s, 10)))

function isSafe(report: number[]): boolean {
  if (report[0] === report[1]) {
    return false
  }

  const increasing = report[0] < report[1]

  for (let i = 0; i < report.length - 1; i++) {
    const diff = Math.abs(report[i] - report[i + 1])
    if (diff < 1 || diff > 3) {
      return false
    }

    if (
      (increasing && report[i] > report[i + 1]) ||
      (!increasing && report[i] < report[i + 1])
    ) {
      return false
    }
  }

  return true
}

const safeReports = reports.filter(isSafe)

console.log("Part 1:", safeReports.length)

function isSafeWithOneRemoved(report: number[]): boolean {
  if (isSafe(report)) {
    return true
  }

  for (let i = 0; i < report.length; i++) {
    const newReport = [...report]
    newReport.splice(i, 1)

    if (isSafe(newReport)) {
      return true
    }
  }

  return false
}

const safeReports2 = reports.filter(isSafeWithOneRemoved)

console.log("Part 2:", safeReports2.length)
