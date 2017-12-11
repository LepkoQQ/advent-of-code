const input = require('./input');

const table = input.split('\n').map(e => e.split('\t').map(Number));

const answer1 = table.reduce((acc, row) => acc + (Math.max(...row) - Math.min(...row)), 0);
console.log('Part 1:', answer1);

function evenlyDivide(array) {
  for (const e1 of array) {
    for (const e2 of array) {
      if (e1 !== e2 && e1 % e2 === 0) {
        return e1 / e2;
      }
    }
  }
  return 0;
}

const answer2 = table.reduce((acc, row) => acc + evenlyDivide(row), 0);
console.log('Part 2:', answer2);
