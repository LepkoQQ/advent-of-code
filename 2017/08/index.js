const input = require('./input');

const instructions = input.split('\n');

function largestValue() {
  const reg = {};
  let largest = 0;
  instructions.forEach((inst) => {
    const [action, condition] = inst.split(' if ');
    // eslint-disable-next-line no-eval
    if (eval(condition.replace(/^\w+/, m => reg[m] || 0))) {
      const [r, op, val] = action.split(' ');
      const newVal = (reg[r] || 0) + (op === 'inc' ? Number(val) : -Number(val));
      if (newVal > largest) {
        largest = newVal;
      }
      reg[r] = newVal;
    }
  });
  return [Math.max(...Object.values(reg)), largest];
}

const [answer1, answer2] = largestValue();

console.log('Part 1:', answer1);

console.log('Part 2:', answer2);
