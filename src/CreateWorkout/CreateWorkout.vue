<template>
  <div class="CreateWorkout">
    <Step
        v-for="step in steps"
        :data="step"
        :key="step.order"
        @step-removed="handleRemoveStep"
        @step-changed="handleStepChanged"
    ></Step>
    <AddStep @step-added="handleAddStep"></AddStep>
  </div>
</template>

<script>
import Step from "./Step";
import AddStep from "./AddStep";

export default {
  name: "CreateWorkout",
  components: {Step, AddStep},
  data() {
    return {
      steps: this.$workoutService.getSteps(),
    };
  },
  beforeCreate() {
    if (!this.$workoutService.hasSteps()) {
      this.$workoutService.addStep();
    }
  },
  methods: {
    handleAddStep() {
      this.$workoutService.addStep();
      this.handleStepsChanged();
    },
    handleRemoveStep(step) {
      this.$workoutService.removeStep(step);
      this.handleStepsChanged();
    },
    handleStepChanged(step) {
      this.$workoutService.updateStep(step);
    },
    handleStepsChanged() {
      this.steps = this.$workoutService.getSteps();
    },
  },
}
</script>

<style scoped>

</style>
