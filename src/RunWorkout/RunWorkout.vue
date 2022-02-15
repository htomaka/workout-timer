<template>
  <div class="RunWorkout">
    <p v-if="exercise">{{ activeExercise.activity }}</p>
    <Timer :duration="duration"></Timer>
    <StopWorkout @stopped="handleStopWorkout"></StopWorkout>
  </div>
</template>

<script>
import StopWorkout from "./StopWorkout";
import Timer from "./Timer";
import { WORKOUT_EVENTS } from "@/workout/workout";

export default {
  name: "RunWorkout",
  components: { Timer, StopWorkout },
  inject: ["workoutService"],
  data() {
    return {
      duration: "00:00",
    };
  },
  computed: {
    activeWorkout() {
      return this.workoutService.getActiveWorkout();
    },
    activeExercise() {
      return this.activeWorkout.firstExercise;
    },
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
