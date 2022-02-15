<template>
  <div class="CreateWorkout">
    <Exercise
        v-for="ex in activeWorkout.exercises"
        :data="ex"
        :key="ex.order"
        :workout="activeWorkout"
    ></Exercise>
    <AddExercise :workout="activeWorkout"></AddExercise>
    <WorkoutControls :workout="activeWorkout"></WorkoutControls>
  </div>
</template>

<script>
import Exercise from "./Exercise";
import AddExercise from "./AddExercise";
import WorkoutControls from "./WorkoutControls"

export default {
  name: "CreateWorkout",
  inject: ['workoutService'],
  components: {AddExercise, Exercise, WorkoutControls},
  data() {
    return {
      activeWorkout: this.workoutService.getActiveWorkout()
    };
  }
}
</script>

<style scoped>

</style>
