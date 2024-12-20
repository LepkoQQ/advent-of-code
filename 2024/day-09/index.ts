import { loadInput } from "../utils"

const input = loadInput(import.meta.url)

console.log("day-09")

const blocks = input
  .split("")
  .map((b, i) => {
    if (i % 2 === 1) {
      return Array(parseInt(b, 10)).fill(".")
    } else {
      return Array(parseInt(b, 10)).fill(i / 2)
    }
  })
  .flat()

while (blocks.includes(".")) {
  const lastBlock = blocks.pop() as string
  const firstSpaceIndex = blocks.indexOf(".")
  blocks[firstSpaceIndex] = lastBlock
}

const checksums = blocks.map((b, i) => parseInt(b, 10) * i)
const checksum = checksums.reduce((acc, val) => acc + val, 0)

console.log("Part 1:", checksum)

let files = input.split("").map((b, i) => ({
  fileID: i % 2 === 0 ? i / 2 : null,
  space: parseInt(b, 10),
}))

if (files.at(-1)!.fileID === null) {
  files.pop()
}

let currentID = files.at(-1)!.fileID as number

while (currentID >= 0) {
  const fileIndex = files.findIndex((f) => f.fileID === currentID)
  const file = files[fileIndex]
  const firstSpaceIndex = files.findIndex(
    (f, i) => i < fileIndex && f.fileID === null && f.space >= file.space,
  )
  if (firstSpaceIndex === -1) {
    currentID--
    continue
  }

  const fileCopy = { ...file }
  file.fileID = null

  files[firstSpaceIndex].space -= file.space
  files.splice(firstSpaceIndex, 0, fileCopy)

  if (files.at(-1)!.fileID === null) {
    files.pop()
  }
  files = files.filter((f) => f.space > 0)

  for (let i = 0; i < files.length; i++) {
    if (i > 0 && files[i].fileID === null && files[i - 1].fileID === null) {
      files[i - 1].space += files[i].space
      files.splice(i, 1)
      i--
    }
  }

  currentID--
}

const blocks2 = files
  .map((f, i) => {
    if (f.fileID === null) {
      return Array(f.space).fill(".")
    } else {
      return Array(f.space).fill(f.fileID)
    }
  })
  .flat()

const checksums2 = blocks2.map((b, i) => (b === "." ? 0 : parseInt(b, 10) * i))
const checksum2 = checksums2.reduce((acc, val) => acc + val, 0)

console.log("Part 2:", checksum2)
