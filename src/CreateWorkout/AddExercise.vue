<template>
  <div>
    <button class="button button--link" @click="handleAdd()">
      Add exercise
    </button>
  </div>
</template>


<script>
export default {
  name: "AddExercise",
  props: {
    workout: Object,
  },
  methods: {
    handleAdd() {
      this.workout.addExercise();
    },
  },
};
</script>
