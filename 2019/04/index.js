const { readToString } = require('../utils');

const input = readToString(`${__dirname}/input`);

// part 1
{
  const [rangeStart, rangeEnd] = input
    .trim()
    .split('-')
    .map(Number);

  const matching = [];
  for (let num = 111111; num <= rangeEnd; num++) {
    if (num < rangeStart) {
      continue;
    }
    if (String(num).length !== 6) {
      continue;
    }
    const digits = Array.from(String(num)).map(Number);
    if (!digits.every((d, i, a) => i === 0 || d >= a[i - 1])) {
      continue;
    }
    if (!digits.some((d, i, a) => d === a[i - 1])) {
      continue;
    }

    matching.push(num);
  }

  console.log('part 1 =', matching.length);
}

// part 2
{
  const [rangeStart, rangeEnd] = input
    .trim()
    .split('-')
    .map(Number);

  const matching = [];
  for (let num = 111111; num <= rangeEnd; num++) {
    if (num < rangeStart) {
      continue;
    }
    if (String(num).length !== 6) {
      continue;
    }
    const digits = Array.from(String(num)).map(Number);
    if (!digits.every((d, i, a) => i === 0 || d >= a[i - 1])) {
      continue;
    }
    if (!digits.some((d, i, a) => d === a[i - 1])) {
      continue;
    }

    let hasDouble = false;
    for (let i = 0; i < digits.length; ) {
      let same = 0;
      while (digits[i] === digits[i + same]) {
        same++;
      }
      if (same === 2) {
        hasDouble = true;
        break;
      }
      i += same;
    }
    if (!hasDouble) {
      continue;
    }

    matching.push(num);
  }

  console.log('part 2 =', matching.length);
}
