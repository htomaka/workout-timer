<template>
  <div class="button-group">
    <StartWorkout @started="handleStart"></StartWorkout>
    <SaveWorkout></SaveWorkout>
  </div>
</template>

<script>

import StartWorkout from "./StartWorkout";
import SaveWorkout from "./SaveWorkout";

export default {
  name: "WorkoutControls",
  components: {StartWorkout, SaveWorkout},
  props: {
    workout: Object
  },
  methods: {
    handleStart() {
      this.workout.start();
    },
  }
}
</script>

<style scoped>

</style>
