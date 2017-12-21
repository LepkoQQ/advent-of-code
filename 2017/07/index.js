const input = require('./input');

const rows = input.split('\n');

const answer1 = rows
  .find((e, i, a) => a.every((e2, i2) => i === i2 || !e2.includes(e.split(' ')[0])))
  .split(' ')[0];
console.log('Part 1:', answer1);

function parseRows(r) {
  const regex = /^(\w+) \((\d+)\)(?:\s-> (.+))?/;
  const obj = {};
  r.forEach((e) => {
    const [, name, weight, children] = regex.exec(e);
    obj[name] = {
      weight: Number(weight),
      children: children ? children.split(', ') : [],
    };
  });

  function calcFullWeight(o) {
    if (!o.fullWeight) {
      const cw = o.children.map(c => calcFullWeight(obj[c]));
      o.fullWeight = o.weight + cw.reduce((acc, curr) => acc + curr, 0);
    }
    return o.fullWeight;
  }

  Object.values(obj).forEach(calcFullWeight);
  return obj;
}

const obj = parseRows(rows);

function calculateWeight(name) {
  const cw = {};
  obj[name].children.forEach((c) => {
    cw[obj[c].fullWeight] = (cw[obj[c].fullWeight] || 0) + 1;
  });

  const keys = Object.keys(cw).map(Number);
  if (keys.length > 1) {
    const x = keys.sort((a, b) => cw[a] - cw[b])[0];
    const o = obj[name].children.find(c => obj[c].fullWeight === x);
    const ret = calculateWeight(o);
    if (ret === -1) {
      const diff = keys[0] - keys[1];
      return (obj[o].weight - diff);
    }
    return ret;
  }
  return -1;
}

console.log('Part 2:', calculateWeight(answer1));
