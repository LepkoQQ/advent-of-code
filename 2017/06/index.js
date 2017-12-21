const input = require('./input');

const array = input.split('\t').map(Number);

function reallocate(arr) {
  let i = arr.indexOf(Math.max(...arr));
  let hold = arr[i];
  arr[i] = 0;
  while (hold) {
    i = (i + 1) % arr.length;
    arr[i]++;
    hold--;
  }
  return arr;
}

function reallocateUntilDuplicate() {
  const arr = array.slice();
  const history = [];

  while (true) {
    const next = reallocate(arr).join(',');
    const i = history.indexOf(next);
    if (i !== -1) {
      return [history.length + 1, history.length - i];
    }
    history.push(next);
  }
}

const [answer1, answer2] = reallocateUntilDuplicate();

console.log('Part 1:', answer1);

console.log('Part 2:', answer2);
