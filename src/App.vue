<template>
  <div class="container">
    <h1>Workout countdown</h1>
    <CreateWorkout v-if="mode === 'idle'"></CreateWorkout>
    <div class="grid">
      <WorkoutControls v-if="mode === 'idle'"></WorkoutControls>
      <RunWorkout v-if="mode === 'running'"></RunWorkout>
    </div>
  </div>
</template>

<script>
import RunWorkout from "./RunWorkout/RunWorkout";
import WorkoutControls from "./WorkoutControls/WorkoutControls";
import CreateWorkout from "./CreateWorkout/CreateWorkout";
import {WORKOUT_EVENTS} from "@/workout/workout";

export default {
  name: "App",
  components: {
    RunWorkout,
    WorkoutControls,
    CreateWorkout
  },
  inject: ['workout'],
  data() {
    return {
      mode: 'idle'
    }
  },
  beforeMount() {
    this.workout.on(WORKOUT_EVENTS.STARTED, () => this.mode = 'running');
    this.workout.on(WORKOUT_EVENTS.STOPPED, () => this.mode = 'idle');
  },
  unmounted() {
    this.workout.off(WORKOUT_EVENTS.STARTED);
    this.workout.off(WORKOUT_EVENTS.STOPPED);
  }
};
</script>

<style scoped>

</style>
