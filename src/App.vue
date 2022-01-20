<template>
  <div class="container">
    <h1>Workout timer</h1>
    <CreateWorkout v-if="mode === 'idle'"></CreateWorkout>
    <WorkoutControls v-if="mode === 'idle'"></WorkoutControls>
    <RunWorkout v-if="mode === 'running'"></RunWorkout>
  </div>
</template>

<script>


import RunWorkout from "./RunWorkout/RunWorkout";
import WorkoutControls from "./WorkoutControls/WorkoutControls";
import CreateWorkout from "./CreateWorkout/CreateWorkout";
import eventBus from "./utils/event-bus";

export default {
  name: "App",
  components: {
    RunWorkout,
    WorkoutControls,
    CreateWorkout
  },
  data() {
    return {
      mode: 'idle'
    }
  },
  created() {
    eventBus.$on('workout::started', () => this.mode = 'running');
    eventBus.$on('workout::stopped', () => this.mode = 'idle');
  },
  destroyed() {
    eventBus.$off('workout::started');
    eventBus.$off('workout::stopped');
  }
};
</script>

<style scoped>
.container {
  max-width: 45rem;
  margin: 0 auto;
}
</style>
