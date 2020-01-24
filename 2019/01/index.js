const { readToString } = require('../utils');

const input = readToString(`${__dirname}/input`);

const masses = input
  .trim()
  .split('\n')
  .map(Number);

const fuels = masses.map((m) => Math.floor(m / 3) - 2);
const totalFuel = fuels.reduce((sum, cur) => sum + cur, 0);

console.log('part 1 =', totalFuel);

const fuels2 = masses.map((m) => {
  let sum = 0;
  let f = m;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    f = Math.floor(f / 3) - 2;
    if (f <= 0) {
      break;
    }
    sum += f;
  }
  return sum;
});
const totalFuel2 = fuels2.reduce((sum, cur) => sum + cur, 0);

console.log('part 2 =', totalFuel2);
