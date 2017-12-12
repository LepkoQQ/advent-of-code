const input = require('./input');

const instructions = input.split('\n').map(Number);

function countSteps(partTwo = false) {
  const inst = instructions.slice(0);
  let count = 0;
  let index = 0;

  while (true) {
    if (index < 0 || index >= inst.length) {
      return count;
    }
    const next = index + inst[index];
    if (partTwo && inst[index] >= 3) {
      inst[index]--;
    } else {
      inst[index]++;
    }
    index = next;
    count++;
  }
}

console.log('Part 1:', countSteps());

console.log('Part 2:', countSteps(true));
