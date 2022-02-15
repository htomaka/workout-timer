<template>
  <div>
    <button @click="handleStop()">Stop</button>
  </div>
</template>

<script>
export default {
  name: "StopWorkout",
  methods: {
    handleStop() {
      this.$emit("stopped");
    },
  },
};
</script>
