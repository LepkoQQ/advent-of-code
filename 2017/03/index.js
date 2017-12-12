const input = require('./input');

function distanceFromCenter(value) {
  const width = Math.ceil(Math.sqrt(value)) | 1; // |1 returns next odd value if value is even
  const centerDist = Math.floor(width / 2);
  const fromCenter = Math.abs((((width ** 2) - value) % (width - 1)) - centerDist);
  return centerDist + fromCenter;
}

console.log('Part 1:', distanceFromCenter(input));

function buildSpiral(maxValue) {
  const spiral = {};
  const directions = [[0, 1], [-1, 0], [0, -1], [1, 0]];
  const neighbors = directions.concat([[1, 1], [-1, -1], [1, -1], [-1, 1]]);
  let dirIndex = 0;

  const pos = [0, 0];
  spiral[pos.join(',')] = 1;

  while (true) {
    const nextDir = (dirIndex + 1) % directions.length;
    if (spiral[`${pos[0] + directions[nextDir][0]},${pos[1] + directions[nextDir][1]}`] == null) {
      dirIndex = nextDir;
    }

    pos[0] += directions[dirIndex][0];
    pos[1] += directions[dirIndex][1];

    const sum = neighbors.reduce((acc, [x, y]) => {
      const val = spiral[`${pos[0] + x},${pos[1] + y}`] || 0;
      return acc + val;
    }, 0);

    if (sum > maxValue) {
      return sum;
    }

    spiral[pos.join(',')] = sum;
  }
}

console.log('Part 2:', buildSpiral(input));
