/* eslint-disable */

function isConfigurationValid(heights, leftConstraint, rightConstraint) {
  const fHeights = heights.filter(h => h !== null);
  return countIncreasingHeights(fHeights) === leftConstraint && countIncreasingHeights(fHeights.reverse()) === rightConstraint;
}

function hasDuplicates(values) {
  const valueSet = new Set(values);
  return valueSet.size !== values.length;
}

function countIncreasingHeights(heights) {
  if (heights.length === 0) return;

  let currentMax = heights[0];
  let count = 1;
  for (let i = 1; i < heights.length; ++i) {
    if (heights[i] > currentMax) {
      count += 1;
      currentMax = heights[i];
    }
  }
  return count;
}

function safeRowMove(board, size, rowConstraints, row, col, num) {
  const _row = [...board[row]];
  _row[col] = num;
  if (col === size-1) return isConfigurationValid(_row, rowConstraints[row][0], rowConstraints[row][1]);
  return true;
}

function safeColumnMove(board, size, columnConstraints, row, col, num) {
  const column = extractColumn(board, col);
  column[row] = num;
  if (row === size-1) return isConfigurationValid(column, columnConstraints[col][0], columnConstraints[col][1]);
  return true;
}

function safeMove(board, size, rowConstraints, columnConstraints, row, col, num) {
  return safeRowMove(board, size, rowConstraints, row, col, num) &&
    safeColumnMove(board, size, columnConstraints, row, col, num);
}

function possibleMoves(board, size, row, col) {
  const possible = new Set([...Array(size+1).keys()].slice(1));
  const rowValues = extractRow(board, row);
  const columnValues = extractColumn(board, col);
  for (let r of rowValues) {
    possible.delete(r);
  }
  for (let c of columnValues) {
    possible.delete(c);
  }

  return Array.from(possible);
}

function isBoardFull(board) {
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      if (board[i][j] === null) return false;
    }
  }
  return true;
}

function nextUnfilledSpot(board) {
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      if (board[i][j] === null) return [i, j];
    }
  }
}

function extractRow(board, i) {
  if (i > board.length) throw new Error('N is too large for this board');
  return [...board[i]];
}

function extractColumn(board, j) {
  if (board.length <= 0) throw new Error('Board is too small');
  if (j > board[0].length) throw new Error('N is too large for this board');

  const column = new Array();
  for (let i = 0; i < board[0].length; ++i) {
    column.push(board[i][j]);
  }
  return column;
}

function isBoardSquare(board, n) {
  if (n > 0 && board.length === n) {
    for (let i = 0; i < n; ++i) {
      if (board[i].length !== n) {
        return false;
      }
    }
    return true;
  }
  return false;
}

function isBoardValid(board, rowConstraints, columnConstraints, n) {
  if (!isBoardSquare(board, n)) return false;
  for (let i = 0; i < n; ++i) {
    const row = extractRow(board, i);
    const rowConstraint = rowConstraints[i];
    if (!isConfigurationValid(row, rowConstraint[0], rowConstraint[1])) return false;

    const column = extractColumn(board, i);
    const columnConstraint = columnConstraints[i];
    if (!isConfigurationValid(column, columnConstraint[0], columnConstraint[1])) return false;
  }
  return true;
}

export function solveBoard(n, rowConstraints, columnConstraints) {
  const board = [...Array(n)].map(k => [...Array(n)].map(p => null));

  function solve(board) {

    if (isBoardFull(board)) return true;
    const [row, col] = nextUnfilledSpot(board);
    const possible = possibleMoves(board, n, row, col);
    for (let num of possible) {
      if (safeMove(board, n, rowConstraints, columnConstraints, row, col, num)) {
        board[row][col] = num;

        if (solve(board)) {
          return true;
        }

        board[row][col] = null;
      }
    }
    return false;
  }
  const success = solve(board);
  if (!success) throw new Error('Could not solve puzzle.');

  return board;
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

export function generateRandomBoard(size) {
const board = [...Array(size)].map(k => [...Array(size)].map(p => null));

  function generate(board) {

    if (isBoardFull(board)) return true;
    const [row, col] = nextUnfilledSpot(board);
    let possible = possibleMoves(board, size, row, col);
    shuffleArray(possible);

    for (let i = 0; i < possible.length; i += 1) {
      board[row][col] = possible[i];

      if (generate(board)) {
        return true;
      }

      board[row][col] = null;
    }
    return false;
  }
  const success = generate(board);
  if (!success) throw new Error('Could not generate puzzle.');

  return board;
}

export function calculateConstraints(board) {
  const rowConstraints = [];
  const columnConstraints = [];

  for (let i = 0; i < board.length; i += 1) {
    const row = extractRow(board, i);
    const column = extractColumn(board, i);

    rowConstraints.push([countIncreasingHeights(row), 
      countIncreasingHeights(row.reverse())]);

    columnConstraints.push([countIncreasingHeights(column), 
      countIncreasingHeights(column.reverse())]);
  }
  return {
    row: rowConstraints,
    column: columnConstraints,
  };
}

/* test

const exampleBoard = [
  [1, 2, 3, 4],
  [2, 1, 4, 3],
  [3, 4, 2, 1],
  [4, 3, 1, 2],
];

const exampleRowConstraints = [
  [4, 1],
  [2, 2],
  [2, 3],
  [1, 3],
];

const exampleColumnConstraints = [
  [4, 1],
  [2, 2],
  [2, 3],
  [1, 3],
];

console.log(solveBoard(4, exampleRowConstraints, exampleColumnConstraints));


const exampleRowConstraints = [
  [2, 3],
  [3, 3],
  [1, 2],
  [2, 2],
  [3, 1],
];

const exampleColumnConstraints = [
  [2, 3],
  [1, 2],
  [2, 2],
  [3, 2],
  [3, 1],
];


console.log(solveBoard(5, exampleRowConstraints, exampleColumnConstraints));


*/
