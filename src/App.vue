<template>
  <div class="container">
    <h1>Workout countdown</h1>
    <CreateWorkout v-if="mode === 'idle'"></CreateWorkout>
    <div class="grid">
      <RunWorkout v-if="mode === 'running'"></RunWorkout>
      <ViewWorkouts v-if="mode === 'idle'"></ViewWorkouts>
    </div>
  </div>
</template>

<script>
import CreateWorkout from "./CreateWorkout/CreateWorkout";
import { WORKOUT_EVENTS } from "@/workout/workout";
import ViewWorkouts from "@/ViewWorkouts/ViewWorkouts";
import RunWorkout from "@/RunWorkout/RunWorkout";

export default {
  name: "App",
  components: {
    ViewWorkouts,
    RunWorkout,
    CreateWorkout,
  },
  inject: ["workoutService"],
  data() {
    return {
      mode: "idle",
      activeWorkout: this.workoutService.getActiveWorkout(),
    };
  },
  mounted() {
    this.activeWorkout.on(
      WORKOUT_EVENTS.STARTED,
      () => (this.mode = "running")
    );
    this.activeWorkout.on(WORKOUT_EVENTS.STOPPED, () => (this.mode = "idle"));
  },
  unmounted() {
    this.activeWorkout.off(WORKOUT_EVENTS.STARTED);
    this.activeWorkout.off(WORKOUT_EVENTS.STOPPED);
  },
};
</script>

<style scoped>
</style>
