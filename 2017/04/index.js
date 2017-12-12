const input = require('./input');

const phrases = input.split('\n').map(e => e.split(' '));

const answer1 = phrases
  .reduce((acc, e) => acc + Number(new Set(e).size === e.length), 0);
console.log('Part 1:', answer1);

const answer2 = phrases
  .map(e => e.map(word => word.split('').sort().join('')))
  .reduce((acc, e) => acc + Number(new Set(e).size === e.length), 0);
console.log('Part 2:', answer2);
