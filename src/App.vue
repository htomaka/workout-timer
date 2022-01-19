<template>
  <div class="container">
    <h1>Workout timer</h1>
    <h2>Create workout</h2>
    <Step
        v-for="step in steps"
        :data="step"
        :key="step.order"
        @step-removed="handleRemoveStep"
        @step-changed="handleStepChanged"
    ></Step>
    <AddStep @step-added="handleAddStep"></AddStep>
    <hr/>
    <div class="flex-container">
      <StopWorkout @stopped="handleStopWorkout"></StopWorkout>
      <PlayWorkout @started="handleStartWorkout"></PlayWorkout>
      <SaveWorkout></SaveWorkout>
      <StepPosition :position="currentStepPosition"></StepPosition>
      <Countdown :duration="duration"></Countdown>
    </div>
  </div>
</template>

<script>
import Step from "./Step";
import AddStep from "./AddStep";
import PlayWorkout from "./PlayWorkout";
import SaveWorkout from "./SaveWorkout";
import eventBus from "./utils/event-bus";
import Countdown from "./Countdown";
import StopWorkout from "./StopWorkout";
import StepPosition from "./StepPosition";

export default {
  name: "App",
  components: {StepPosition, Countdown, Step, AddStep, PlayWorkout, SaveWorkout, StopWorkout},
  data() {
    return {
      steps: this.$workoutService.getSteps(),
      duration: null,
      currentStepPosition: this.$workoutService.getCurrentStepPosition()
    };
  },
  beforeCreate() {
    if (!this.$workoutService.hasSteps()) {
      this.$workoutService.addStep();
    }
  },
  created() {
    eventBus.$on('TICK', step => this.duration = step.duration);
    eventBus.$on('STEP_CHANGED', () => this.currentStepPosition = this.$workoutService.getCurrentStepPosition())
  },
  destroyed() {
    eventBus.$off('TICK');
    eventBus.$off('STEP_CHANGED');
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
    handleStartWorkout() {
      this.$workoutService.start((step) => eventBus.$emit('TICK', step), () => eventBus.$emit('STEP_CHANGED'), () => this.handleStopWorkout());
    },
    handleStopWorkout() {
      this.$workoutService.stop();
    }
  },
};
</script>

<style scoped>
.container {
  max-width: 45rem;
  margin: 0 auto;
}

.flex-container {
  display: flex;
}
</style>
