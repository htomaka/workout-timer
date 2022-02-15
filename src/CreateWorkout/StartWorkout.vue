<template>
  <div>
    <button @click="handleStart()">Play</button>
  </div>
</template>

<script>
export default {
  name: "StartWorkout",
  methods: {
    handleStart() {
      this.$emit("started");
    },
  },
};
</script>
