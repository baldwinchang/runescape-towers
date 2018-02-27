<template>
  <div class="container">
    <table class="table borderless">
      <thead>
        <th></th>
        <th v-for="i in size" :key="[i, 'th'].join('_')" style="text-align: center; width:40px">
          <constraint
            flip
            :value="constraints.column[i - 1][0]"
            @increment="$emit('constraint:increment', 'column', i - 1, 0)"
            @decrement="$emit('constraint:decrement', 'column', i - 1, 0)"
          />
        </th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="i in size" :key="[i, 'tr'].join('_')">
          <td>
            <constraint
              :value="constraints.row[i - 1][0]"
              @increment="$emit('constraint:increment', 'row', i - 1, 0)"
              @decrement="$emit('constraint:decrement', 'row', i - 1, 0)"
            />
          </td>
          <td v-for="j in size" :key="[j, i, 'td'].join('_')" style="text-align: center">
            {{ board[i - 1][j - 1] }}
          </td>
          <td>
            <constraint
              :value="constraints.row[i - 1][1]"
              @increment="$emit('constraint:increment', 'row', i - 1, 1)"
              @decrement="$emit('constraint:decrement', 'row', i - 1, 1)"
            />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <th></th>
        <th v-for="i in size" :key="[i, 'th_f'].join('_')" style="text-align: center; width:40px">
          <constraint
            flip
            :value="constraints.column[i - 1][1]"
            @increment="$emit('constraint:increment', 'column', i - 1, 1)"
            @decrement="$emit('constraint:decrement', 'column', i - 1, 1)"
          />
        </th>
        <th></th>
      </tfoot>
    </table>
  </div>
</template>

<script>
import Constraint from './Constraint';

export default {
  props: {
    size: Number,
    constraints: Object,
    board: Array,
  },
  data() {
    return {
    };
  },
  components: {
    Constraint,
  },
};
</script>

<style>
.borderless td, .borderless th, .borderless thead {
    border: none !important;
}
</style>
