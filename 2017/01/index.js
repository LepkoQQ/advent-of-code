const input = require('./input');

const numbers = input.split('').map(Number);

const answer1 = numbers
  .reduce((acc, e, i, a) => ((a[(i + 1) % a.length] === e) ? acc + e : acc), 0);
console.log('Part 1:', answer1);

const answer2 = numbers
  .reduce((acc, e, i, a) => ((a[(i + (a.length / 2)) % a.length] === e) ? acc + e : acc), 0);
console.log('Part 2:', answer2);
