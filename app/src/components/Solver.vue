<template>
  <div class="hello">
    <h1>RuneScape - Tower Puzzle Solver</h1>
    <h3>Treasure Trails - Master Clue Scrolls</h3>
    <div>
      <p style="color:grey">
        Type in the constraints for your puzzle as shown on your
        puzzle interface.
        (<a
          href="http://runescape.wikia.com/wiki/Towers_puzzle_scroll"
          target="_blank">RSWiki/Towers Puzzle Scroll</a>)
      </p>
      <p>
        <strong>Puzzle size:</strong><br />
        <constraint
          :value="size"
          @increment="() => adjustPuzzleSize(1)"
          @decrement="() => adjustPuzzleSize(-1)"
        />
      </p>
      <p v-if="error">
        <strong style="color:red">
          There was an error solving for an answer. There may not be a valid
          answer for that specific set of constraints.
        </strong>
      </p>
      <p v-if="loading">Attempting to solve...</p>
    </div>

    <board
      :size="size"
      :board="board"
      :constraints="constraints"
      @constraint:increment="increment"
      @constraint:decrement="decrement"
    />

    <p v-if="timer.diff"><small>Solved in {{ timer.diff / 1000 }}s</small></p>

    <button :disabled="loading" @click="solve" class="btn-success">
      Solve!
    </button>

    <button :disabled="loading" @click="setDefaults"  style="margin-left: 30px;">
      Random Puzzle
    </button>

  </div>
</template>

<script>
import { solveBoard, generateRandomBoard, calculateConstraints } from '@/utility/solve';

import Board from './Board';
import Constraint from './Constraint';

/*
const exampleBoard = [
  [5, 1, 2, 4, 3],
  [4, 5, 3, 1, 2],
  [1, 3, 5, 2, 4],
  [2, 4, 1, 3, 5],
  [3, 2, 4, 5, 1],
];

const exampleRowConstraints = [
  [1, 3],
  [2, 3],
  [3, 2],
  [3, 1],
  [3, 2],
];

const exampleColumnConstraints = [
  [1, 3],
  [2, 3],
  [3, 2],
  [2, 1],
  [3, 2],
];
*/

export default {
  data() {
    return {
      loading: false,
      error: false,
      size: 5,
      constraints: {
        row: [],
        column: [],
      },
      board: [],

      timer: {
        start: null,
        diff: null,
      },

      solveBoard,
    };
  },
  created() {
    this.setDefaults();
  },
  methods: {
    setDefaults() {
      // Reset State
      this.constraints = {
        row: [],
        column: [],
      };
      this.board = [];

      // This makes for a more realistic and fun page
      // Having a legit puzzle generated!
      const randomBoard = generateRandomBoard(this.size);
      this.constraints = calculateConstraints(randomBoard);

      // this.board = randomBoard;

      for (let i = 0; i < this.size; i += 1) {
        /* const a = Math.floor(this.size / 2);
        const b = this.size - a;
        this.constraints.row.push([a, b]);
        this.constraints.column.push([a, b]); */
        this.board.push([...Array(this.size).keys()].map(() => 'X'));
      }
    },
    solve() {
      try {
        this.timer.start = Date.now();
        this.timer.diff = null;

        this.loading = true;
        this.error = false;
        this.board = solveBoard(this.size, this.constraints.row, this.constraints.column);
      } catch (e) {
        this.error = true;
      } finally {
        this.loading = false;
        this.timer.diff = Date.now() - this.timer.start;
      }
    },
    increment(type, index, bound) {
      if (type === 'column') {
        const { column } = this.constraints;
        column[index][bound] = this.boundValue(column[index][bound] + 1);
        this.$set(this.constraints.column, index, column[index]);
      } else {
        const { row } = this.constraints;
        row[index][bound] = this.boundValue(row[index][bound] + 1);
        this.$set(this.constraints.row, index, row[index]);
      }
    },
    decrement(type, index, bound) {
      if (type === 'column') {
        const { column } = this.constraints;
        column[index][bound] = this.boundValue(column[index][bound] - 1);
        this.$set(this.constraints.column, index, column[index]);
      } else {
        const { row } = this.constraints;
        row[index][bound] = this.boundValue(row[index][bound] - 1);
        this.$set(this.constraints.row, index, row[index]);
      }
    },
    boundValue(value) {
      return Math.max(1, Math.min(this.size, value));
    },
    adjustPuzzleSize(delta) {
      this.size = Math.max(1, Math.min(12, this.size + delta));
      this.setDefaults();
    },
  },
  components: {
    Board,
    Constraint,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
