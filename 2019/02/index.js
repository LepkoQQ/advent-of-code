const { readToString } = require('../utils');

const input = readToString(`${__dirname}/input`);

const ints = input
  .trim()
  .split(',')
  .map(Number);

ints[1] = 12;
ints[2] = 2;

let pos = 0;
while (true) {
  if (ints[pos] === 1) {
    ints[ints[pos + 3]] = ints[ints[pos + 1]] + ints[ints[pos + 2]];
  } else if (ints[pos] === 2) {
    ints[ints[pos + 3]] = ints[ints[pos + 1]] * ints[ints[pos + 2]];
  } else if (ints[pos] === 99) {
    break;
  } else {
    throw new Error(`unexpected opcode ${ints[pos]}`);
  }
  pos += 4;
}

console.log('part 1 =', ints[0]);

const freshInts = input
  .trim()
  .split(',')
  .map(Number);

const expectedResult = 19690720;

function runProgram(noun, verb) {
  const ints2 = freshInts.slice();
  ints2[1] = noun;
  ints2[2] = verb;

  let pos2 = 0;
  while (true) {
    if (ints2[pos2] === 1) {
      ints2[ints2[pos2 + 3]] = ints2[ints2[pos2 + 1]] + ints2[ints2[pos2 + 2]];
    } else if (ints2[pos2] === 2) {
      ints2[ints2[pos2 + 3]] = ints2[ints2[pos2 + 1]] * ints2[ints2[pos2 + 2]];
    } else if (ints2[pos2] === 99) {
      break;
    } else {
      throw new Error(`unexpected opcode ${ints2[pos2]}`);
    }
    pos2 += 4;
  }
  return ints2[0];
}

let noun = 0;
let verb = 0;

nounLoop: for (; noun <= 99; noun++) {
  verb = 0;
  for (; verb <= 99; verb++) {
    const result = runProgram(noun, verb);
    if (result === expectedResult) {
      break nounLoop;
    }
  }
}

console.log('part 2 =', 100 * noun + verb);
