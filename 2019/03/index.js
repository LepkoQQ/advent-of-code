const { readToString } = require('../utils');

const input = readToString(`${__dirname}/input`);

// part 1
{
  const [wire1Path, wire2Path] = input.trim().split('\n');
  const grid = {};

  function populateWirePositions(wirePath, name) {
    const pos = { x: 0, y: 0 };

    wirePath.split(',').forEach((inst) => {
      const dir = inst.slice(0, 1);
      const dist = Number(inst.slice(1));

      const move = { x: 0, y: 0 };
      if (dir === 'R') {
        move.x = 1;
      } else if (dir === 'L') {
        move.x = -1;
      } else if (dir === 'D') {
        move.y = 1;
      } else if (dir === 'U') {
        move.y = -1;
      }

      for (let i = 0; i < dist; i++) {
        pos.x += move.x;
        pos.y += move.y;
        const key = `${pos.x},${pos.y}`;
        grid[key] = grid[key] || {};
        grid[key][name] = true;
      }
    });
  }

  populateWirePositions(wire1Path, 'wire1');
  populateWirePositions(wire2Path, 'wire2');

  const intersections = Object.keys(grid)
    .filter((key) => grid[key].wire1 && grid[key].wire2)
    .map((key) => key.split(',').map(Number))
    .map(([x, y]) => Math.abs(x) + Math.abs(y))
    .sort((a, b) => a - b);

  console.log('part 1 =', intersections[0]);
}

// part 2
{
  const [wire1Path, wire2Path] = input.trim().split('\n');
  const grid = {};

  function populateWirePositions(wirePath, name) {
    const pos = { x: 0, y: 0 };
    let steps = 0;

    wirePath.split(',').forEach((inst) => {
      const dir = inst.slice(0, 1);
      const dist = Number(inst.slice(1));

      const move = { x: 0, y: 0 };
      if (dir === 'R') {
        move.x = 1;
      } else if (dir === 'L') {
        move.x = -1;
      } else if (dir === 'D') {
        move.y = 1;
      } else if (dir === 'U') {
        move.y = -1;
      }

      for (let i = 0; i < dist; i++) {
        pos.x += move.x;
        pos.y += move.y;
        steps += 1;
        const key = `${pos.x},${pos.y}`;
        grid[key] = grid[key] || {};
        grid[key][name] = steps;
      }
    });
  }

  populateWirePositions(wire1Path, 'wire1');
  populateWirePositions(wire2Path, 'wire2');

  const intersections = Object.keys(grid)
    .filter((key) => grid[key].wire1 && grid[key].wire2)
    .map((key) => grid[key].wire1 + grid[key].wire2)
    .sort((a, b) => a - b);

  console.log('part 2 =', intersections[0]);
}
