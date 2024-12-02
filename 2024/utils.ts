import fs from "node:fs"
import path from "node:path"

export function loadInput(scriptUrl: string): string {
  return fs
    .readFileSync(
      path.join(path.dirname(new URL(scriptUrl).pathname), "input.txt"),
      "utf-8",
    )
    .trim()
}
