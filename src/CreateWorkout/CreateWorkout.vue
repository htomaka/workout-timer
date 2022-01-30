<template>
  <div class="CreateWorkout">
    <Exercise
        v-for="ex in exercises"
        :data="ex"
        :key="ex.order"
        @removed="handleRemove"
        @changed="handleChanged"
    ></Exercise>
    <AddExercise @added="handleAdd"></AddExercise>
  </div>
</template>

<script>
import Exercise from "./Exercise";
import AddExercise from "./AddExercise";

export default {
  name: "CreateWorkout",
  components: {AddExercise, Exercise},
  data() {
    return {
      exercises: this.$workoutService.exercises,
    };
  },
  beforeCreate() {
    if (!this.$workoutService.hasExercise()) {
      this.$workoutService.addExercise();
    }
  },
  methods: {
    handleAdd() {
      this.$workoutService.addExercise();
      this.handleWorkoutChanged();
    },
    handleRemove(exercise) {
      this.$workoutService.removeExercise(exercise);
      this.handleWorkoutChanged();
    },
    handleChanged(exercise) {
      this.$workoutService.updateExercise(exercise);
    },
    handleWorkoutChanged() {
      this.exercises = this.$workoutService.exercises;
    },
  },
}
</script>

<style scoped>

</style>
