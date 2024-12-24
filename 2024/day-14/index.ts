import { loadInput } from "../utils"
import readline from "readline"

const input = loadInput(import.meta.url)

console.log("day-14")

const robots = input.split("\n").map((line) => {
  const [x, y, vx, vy] = line.match(/-?\d+/g)!.map(Number)
  return { x, y, vx, vy }
})

function waitForInput(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close()
      resolve(ans)
    }),
  )
}

const width = 101
const height = 103

const halfWidth = Math.floor(width / 2)
const halfHeight = Math.floor(height / 2)

function moveRobots(rbts) {
  for (const robot of rbts) {
    robot.x = (robot.x + robot.vx + width) % width
    robot.y = (robot.y + robot.vy + height) % height
  }
}

function printRobots(rbts) {
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const rs = rbts.filter((robot) => robot.x === i && robot.y === j)
      /*if (i === halfWidth || j === halfHeight) {
        process.stdout.write(" ")
      } else */ if (rs.length > 0) {
        process.stdout.write(rs.length.toString())
      } else {
        process.stdout.write(" ")
      }
    }
    process.stdout.write("\n")
  }
}

for (let i = 0; i < 100; i++) {
  moveRobots(robots)
}

const quadrants = [0, 0, 0, 0]

for (let j = 0; j < height; j++) {
  for (let i = 0; i < width; i++) {
    const rs = robots.filter((robot) => robot.x === i && robot.y === j)
    if (rs.length > 0) {
      if (i < halfWidth && j < halfHeight) {
        quadrants[0] += rs.length
      }
      if (i > halfWidth && j < halfHeight) {
        quadrants[1] += rs.length
      }
      if (i < halfWidth && j > halfHeight) {
        quadrants[2] += rs.length
      }
      if (i > halfWidth && j > halfHeight) {
        quadrants[3] += rs.length
      }
    }
  }
}

const answer = quadrants.reduce((acc, q) => acc * q, 1)

console.log("Part 1:", answer)

const robots2 = input.split("\n").map((line) => {
  const [x, y, vx, vy] = line.match(/-?\d+/g)!.map(Number)
  return { x, y, vx, vy }
})

let i = 0
while (true) {
  moveRobots(robots2)
  i++

  let foundX = 0
  for (let i = 0; i < width; i++) {
    const rs = robots2.filter((robot) => robot.x === i)
    if (rs.length > 15) {
      foundX++
    }
  }

  let foundY = 0
  for (let i = 0; i < height; i++) {
    const rs = robots2.filter((robot) => robot.y === i)
    if (rs.length > 15) {
      foundY++
    }
  }

  if (foundX > 2 && foundY > 2) {
    // printRobots(robots2)
    // await waitForInput("Press enter to continue")
    break
  }
}

console.log("Part 2:", i)
