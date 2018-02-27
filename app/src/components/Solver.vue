<template>
  <div class="hello">
    <h1>RuneScape - Tower Solver</h1>
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
    <form>
      <table style="margin: auto">
        <tr>
          <td></td>
          <td>
            <input type="number" min="1" :max="size" required v-model="columnConstraints[0][0]" />
          </td>
          <td>
            <input type="number" min="1" :max="size" required v-model="columnConstraints[1][0]" />
          </td>
          <td>
            <input type="number" min="1" :max="size" required v-model="columnConstraints[2][0]" />
          </td>
          <td>
            <input type="number" min="1" :max="size" required v-model="columnConstraints[3][0]" />
          </td>
          <td>
            <input type="number" min="1" :max="size" required v-model="columnConstraints[4][0]" />
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <input type="number" min="1" :max="size" required v-model="rowConstraints[0][0]" />
          </td>
          <td>{{ answer[0][0] }}</td>
          <td>{{ answer[0][1] }}</td>
          <td>{{ answer[0][2] }}</td>
          <td>{{ answer[0][3] }}</td>
          <td>{{ answer[0][4] }}</td>
          <td>
            <input type="number" min="1" :max="size" required v-model="rowConstraints[0][1]" />
          </td>
        </tr>
        <tr>
          <td>
            <input type="number" min="1" :max="size" required v-model="rowConstraints[1][0]" />
          </td>
          <td>{{ answer[1][0] }}</td>
          <td>{{ answer[1][1] }}</td>
          <td>{{ answer[1][2] }}</td>
          <td>{{ answer[1][3] }}</td>
          <td>{{ answer[1][4] }}</td>
          <td>
            <input type="number" min="1" :max="size" required v-model="rowConstraints[1][1]" />
          </td>
        </tr>
        <tr>
          <td>
            <input type="number" min="1" :max="size" required v-model="rowConstraints[2][0]" />
          </td>
          <td>{{ answer[2][0] }}</td>
          <td>{{ answer[2][1] }}</td>
          <td>{{ answer[2][2] }}</td>
          <td>{{ answer[2][3] }}</td>
          <td>{{ answer[2][4] }}</td>
          <td>
            <input type="number" min="1" :max="size" required v-model="rowConstraints[2][1]" />
          </td>
        </tr>
        <tr>
          <td>
            <input type="number" min="1" :max="size" required v-model="rowConstraints[3][0]" />
          </td>
          <td>{{ answer[3][0] }}</td>
          <td>{{ answer[3][1] }}</td>
          <td>{{ answer[3][2] }}</td>
          <td>{{ answer[3][3] }}</td>
          <td>{{ answer[3][4] }}</td>
          <td>
            <input type="number" min="1" :max="size" required v-model="rowConstraints[3][1]" />
          </td>
        </tr>
        <tr>
          <td>
            <input type="number" min="1" :max="size" required v-model="rowConstraints[4][0]" />
          </td>
          <td>{{ answer[4][0] }}</td>
          <td>{{ answer[4][1] }}</td>
          <td>{{ answer[4][2] }}</td>
          <td>{{ answer[4][3] }}</td>
          <td>{{ answer[4][4] }}</td>
          <td>
            <input type="number" min="1" :max="size" required v-model="rowConstraints[4][1]" />
          </td>
        </tr>

        <tr>
          <td></td>
          <td>
            <input type="number" min="1" :max="size" required v-model="columnConstraints[0][1]" />
          </td>
          <td>
            <input type="number" min="1" :max="size" required v-model="columnConstraints[1][1]" />
          </td>
          <td>
            <input type="number" min="1" :max="size" required v-model="columnConstraints[2][1]" />
          </td>
          <td>
            <input type="number" min="1" :max="size" required v-model="columnConstraints[3][1]" />
          </td>
          <td>
            <input type="number" min="1" :max="size" required v-model="columnConstraints[4][1]" />
          </td>
          <td></td>
        </tr>
      </table>
      <button :disabled="loading" @click="solve">
        Solve!
      </button>
    </form>
  </div>
</template>

<script>
import solveBoard from '@/utility/solve';

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

export default {
  data() {
    return {
      loading: false,
      error: false,
      size: 5,
      answer: exampleBoard,
      rowConstraints: exampleRowConstraints,
      columnConstraints: exampleColumnConstraints,
      solveBoard,
    };
  },
  methods: {
    solve() {
      try {
        this.loading = true;
        this.error = false;
        this.answer = this.solveBoard(this.size, this.rowConstraints, this.columnConstraints);
      } catch (e) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
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
