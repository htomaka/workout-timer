<template>
  <div>
    <button class="button button--link" @click="handleAdd()">Add exercise</button>
  </div>
</template>


<script>
export default {
  name: "AddExercise",
  methods: {
    handleAdd() {
      this.$emit("added");
    },
  },
};
</script>
