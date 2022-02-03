<template>
  <div class="RunWorkout">
    <p v-if="exercise">{{ exercise.activity }}</p>
    <Timer :duration="duration"></Timer>
    <StopWorkout @stopped="handleStopWorkout"></StopWorkout>
  </div>
</template>

<script>
import StopWorkout from "../WorkoutControls/StopWorkout";
import Timer from "./Timer";
import {WORKOUT_EVENTS} from "@/workout/workout";

export default {
  name: "RunWorkout",
  components: {Timer, StopWorkout},
  inject: ['workout'],
  data() {
    return {
      exercise: this.workout.exercises[0],
      duration: this.workout.exercises[0]['duration']
    }
  },
  created() {
    this.workout.on(WORKOUT_EVENTS.TICK, step => {
      this.duration = step.duration
    });
    this.workout.on(WORKOUT_EVENTS.NEXT_EXERCISE_STARTED, (step) => {
      this.currentStepPosition = this.workout.getRemainingCount();
      this.exercise = step;
    });
  },
  unmounted() {
    this.workout.off(WORKOUT_EVENTS.TICK);
    this.workout.off(WORKOUT_EVENTS.NEXT_EXERCISE_STARTED);
  },
  methods: {
    handleStopWorkout() {
      this.workout.stop();
    },
  }
}
</script>

<style scoped>

</style>
