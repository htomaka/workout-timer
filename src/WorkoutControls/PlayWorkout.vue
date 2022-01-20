<template>
  <div>
    <button @click="handlePlay()">Play</button>
  </div>
</template>

<script>
export default {
  name: "PlayWorkout",
  methods: {
    handlePlay() {
      this.$emit("started");
    },
  },
};
</script>