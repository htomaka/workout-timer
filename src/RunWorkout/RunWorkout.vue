<template>
  <div class="RunWorkout">
    <p v-if="exercise">{{ exercise.activity }}</p>
    <Timer :duration="duration"></Timer>
    <StopWorkout @stopped="handleStopWorkout"></StopWorkout>
  </div>
</template>

<script>
import eventBus from "../utils/event-bus";
import StopWorkout from "../WorkoutControls/StopWorkout";
import Timer from "./Timer";

export default {
  name: "RunWorkout",
  components: {Timer, StopWorkout},
  data() {
    return {
      exercise: this.$workoutService.exercises[0],
      duration: this.$workoutService.exercises[0]['duration']
    }
  },
  created() {
    eventBus.$on('clock::tick', step => {
      this.duration = step.duration
    });
    eventBus.$on('workout::nextExerciseStarted', (step) => {
      this.currentStepPosition = this.$workoutService.getRemainingCount();
      this.exercise = step;
    });
  },
  destroyed() {
    eventBus.$off('clock::tick');
    eventBus.$off('workout::nextExerciseStarted');
  },
  methods: {
    handleStopWorkout() {
      this.$workoutService.stop();
    },
  }
}
</script>

<style scoped>

</style>
