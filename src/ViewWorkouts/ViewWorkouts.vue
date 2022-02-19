<template>
  <ul>
    <li
      v-for="workout in workouts"
      :key="workout.uuid"
    >
     <a href="#" @click.prevent="handleStart(workout)">{{ workout.name || "--" }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ViewWorkouts",
  data() {
    return {
      workouts: null,
    };
  },
  inject: ["workoutService"],
  created() {
    this.workoutService.onChange((data) => (this.workouts = data));
  },
  methods: {
    handleStart(workout) {
      console.log(workout);
      workout.start();
    },
  },
};
</script>

<style scoped>
</style>
