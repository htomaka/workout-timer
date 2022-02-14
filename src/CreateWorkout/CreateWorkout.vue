<template>
  <div class="CreateWorkout">
    <Exercise
        v-for="ex in workout.exercises"
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
  inject: ['workoutService'],
  components: {AddExercise, Exercise},
  data() {
    return {
      workout: this.workoutService.currentWorkout,
    };
  },
  beforeCreate() {
    this.workoutService.create();
    if (!this.workout.hasExercise()) {
      this.workout.addExercise();
    }
  },
  methods: {
    handleAdd() {
      this.workout.addExercise();
    },
    handleRemove(exercise) {
      this.workout.removeExercise(exercise);
    },
  },
}
</script>

<style scoped>

</style>
