<template>
  <span>
    <span v-if="!flip">
      <i class="fas fa-minus-circle" @click="$emit('decrement')"/>
        {{ value }}
      <i class="fas fa-plus-circle" @click="$emit('increment')" />
    </span>
    <span v-else>
      <i class="fas fa-plus-circle" @click="$emit('increment')" />
      {{ value }}
      <i class="fas fa-minus-circle" @click="$emit('decrement')" />
    </span>
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default() {
        return 1;
      },
    },
    flip: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
};
</script>
