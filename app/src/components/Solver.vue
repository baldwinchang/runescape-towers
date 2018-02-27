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

    <button :disabled="loading" @click="solve">
      Solve!
    </button>

  </div>
</template>

<script>
import solveBoard from '@/utility/solve';
import Board from './Board';

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
      solveBoard,
    };
  },
  created() {
    this.setDefaults();
  },
  methods: {
    setDefaults() {
      for (let i = 0; i < this.size; i += 1) {
        this.constraints.row.push([2, 3]);
        this.constraints.column.push([2, 3]);
        this.board.push([...Array(this.size).keys()].map(() => 'X'));
      }
    },
    solve() {
      try {
        this.loading = true;
        this.error = false;
        this.board = solveBoard(this.size, this.constraints.row, this.constraints.column);
      } catch (e) {
        this.error = true;
      } finally {
        this.loading = false;
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
  },
  components: {
    Board,
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
