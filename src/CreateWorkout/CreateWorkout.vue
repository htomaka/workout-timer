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
  inject: ['workout'],
  data() {
    return {
      exercises: [],
    };
  },
  created() {
    if (!this.workout.hasExercise()) {
      this.workout.addExercise();
    }
  },
  mounted() {
    this.exercises = this.workout.exercises;
  },
  methods: {
    handleAdd() {
      this.workout.addExercise();
      this.handleWorkoutChanged();
    },
    handleRemove(exercise) {
      this.workout.removeExercise(exercise);
      this.handleWorkoutChanged();
    },
    handleChanged(exercise) {
      this.workout.updateExercise(exercise);
    },
    handleWorkoutChanged() {
      this.exercises = this.workout.exercises;
    },
  },
}
</script>

<style scoped>

</style>
