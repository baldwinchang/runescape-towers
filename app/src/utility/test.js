const { solveBoard } = require('./solve');

const n = 5;
const rC = [
  [3, 2],
  [3, 1],
  [1, 3],
  [2, 4],
  [3, 2],
];
const cC = [
  [3, 3],
  [3, 2],
  [1, 4],
  [3, 1],
  [2, 2],
];

console.log(solveBoard);

console.log(solveBoard(n, rC, cC));
