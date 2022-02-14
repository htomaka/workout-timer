<template>
  <div class="container">
    <h1>Workout countdown</h1>
    <CreateWorkout v-if="mode === 'idle'"></CreateWorkout>
    <div class="grid">
      <WorkoutControls v-if="mode === 'idle'"></WorkoutControls>
      <RunWorkout v-if="mode === 'running'"></RunWorkout>
      <ViewWorkouts v-if="mode === 'idle'"></ViewWorkouts>
    </div>
  </div>
</template>

<script>
import WorkoutControls from "./WorkoutControls/WorkoutControls";
import CreateWorkout from "./CreateWorkout/CreateWorkout";
import {WORKOUT_EVENTS} from "@/workout/workout";
import ViewWorkouts from "@/ViewWorkouts/ViewWorkouts";
import RunWorkout from "@/RunWorkout/RunWorkout";

export default {
  name: "App",
  components: {
    ViewWorkouts,
    RunWorkout,
    WorkoutControls,
    CreateWorkout
  },
  inject: ['workout', 'workoutService'],
  data() {
    return {
      mode: 'idle'
    }
  },
  created() {
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
