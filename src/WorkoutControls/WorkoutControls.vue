<template>
  <div class="button-group">
    <StartWorkout @started="handleStart"></StartWorkout>
    <SaveWorkout></SaveWorkout>
  </div>
</template>

<script>

import StartWorkout from "./StartWorkout";
import SaveWorkout from "../CreateWorkout/SaveWorkout";

export default {
  name: "WorkoutControls",
  components: {StartWorkout, SaveWorkout},
  methods: {
    handleStart() {
      this.$workoutService.start();
    },
  }
}
</script>

<style scoped>

</style>
