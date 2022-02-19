<template>
  <div class="RunWorkout">
    <Activity :name="activeExercise.activity"></Activity>
    <Timer :duration="duration"></Timer>
    <StopWorkout @stopped="handleStopWorkout"></StopWorkout>
  </div>
</template>

<script>
import StopWorkout from "./StopWorkout";
import Timer from "./Timer";
import Activity from "./Activity";
import { WORKOUT_EVENTS } from "@/workout/workout";

export default {
  name: "RunWorkout",
  components: { Timer, StopWorkout, Activity },
  inject: ["workoutService"],
  data() {
    return {
      duration: this.workoutService.getActiveWorkout().firstExercise.duration,
      activeWorkout: this.workoutService.getActiveWorkout(),
      activeExercise: this.workoutService.getActiveWorkout().firstExercise,
    };
  },
  created() {
    this.activeWorkout.on(WORKOUT_EVENTS.TICK, (step) => {
      this.duration = step.duration;
    });
    this.activeWorkout.on(WORKOUT_EVENTS.NEXT_EXERCISE_STARTED, (step) => {
      this.currentStepPosition = this.activeWorkout.getRemainingCount();
      this.activeExercise = step;
    });
  },
  unmounted() {
    this.activeWorkout.off(WORKOUT_EVENTS.TICK);
    this.activeWorkout.off(WORKOUT_EVENTS.NEXT_EXERCISE_STARTED);
  },
  methods: {
    handleStopWorkout() {
      this.activeWorkout.stop();
    },
  },
};
</script>

<style scoped>
</style>
