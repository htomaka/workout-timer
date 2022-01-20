<template>
  <div>
    <button @click="handleAddStep()">+</button>
  </div>
</template>


<script>
export default {
  name: "AddStep",
  methods: {
    handleAddStep() {
      this.$emit("step-added", "click!");
    },
  },
};
</script>
