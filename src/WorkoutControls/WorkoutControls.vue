<template>
  <div class="flex-container">
    <PlayWorkout @started="handleStartWorkout"></PlayWorkout>
    <SaveWorkout></SaveWorkout>
  </div>
</template>

<script>

import PlayWorkout from "./PlayWorkout";
import SaveWorkout from "../CreateWorkout/SaveWorkout";

export default {
  name: "WorkoutControls",
  components: {PlayWorkout, SaveWorkout},
  methods: {
    handleStartWorkout() {
      this.$workoutService.start();
    },
  }
}
</script>

<style scoped>
.flex-container {
  display: flex;
}
</style>
