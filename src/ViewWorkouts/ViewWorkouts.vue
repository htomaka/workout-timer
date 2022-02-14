<template>
  <ul>
    <li v-for="workout in workouts" :key="workout.uuid">
      {{ workout.name || '--' }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "ViewWorkouts",
  data() {
    return {
      workouts: null
    }
  },
  inject: ['workoutService'],
  created() {
    this.workoutService.onChange(data => this.workouts = data);
  }
}
</script>

<style scoped>

</style>
