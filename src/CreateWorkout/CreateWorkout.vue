<template>
  <div class="CreateWorkout">
    <Exercise
        v-for="step in steps"
        :data="step"
        :key="step.order"
        @step-removed="handleRemoveStep"
        @step-changed="handleStepChanged"
    ></Exercise>
    <AddStep @step-added="handleAddStep"></AddStep>
  </div>
</template>

<script>
import Exercise from "./Exercise";
import AddStep from "./AddStep";

export default {
  name: "CreateWorkout",
  components: {Exercise, AddStep},
  data() {
    return {
      steps: this.$workoutService.exercises,
    };
  },
  beforeCreate() {
    if (!this.$workoutService.hasExercise()) {
      this.$workoutService.addExercise();
    }
  },
  methods: {
    handleAddStep() {
      this.$workoutService.addExercise();
      this.handleStepsChanged();
    },
    handleRemoveStep(step) {
      this.$workoutService.removeExercise(step);
      this.handleStepsChanged();
    },
    handleStepChanged(step) {
      this.$workoutService.updateExercise(step);
    },
    handleStepsChanged() {
      this.steps = this.$workoutService.exercises;
    },
  },
}
</script>

<style scoped>

</style>
