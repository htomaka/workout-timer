<template>
  <div class="Step">
    <form @change="handleChange()">
      <input
          type="text"
          placeholder="fast"
          aria-label="description"
          v-model="model.description"
      />
      <select v-model="model.activity">
        <option value="getReady">Get ready</option>
        <option value="warmup">Warmup</option>
        <option value="rest">Rest</option>
        <option value="work">Work</option>
        <option value="cooldown">Cool down</option>
      </select>
      <input
          type="number"
          placeholder="mm"
          aria-label="minutes"
          min="0"
          v-model="model.duration.minutes"
      />
      <input
          type="number"
          placeholder="ss"
          aria-label="seconds"
          min="0"
          v-model="model.duration.seconds"
      />
    </form>
    <button @click="handleRemoveStep()">X</button>
  </div>
</template>

<script>

export default {
  name: "Exercise",
  props: {
    data: Object,
  },
  computed: {
    model() {
      return {...this.data};
    },
  },
  methods: {
    handleRemoveStep() {
      this.$emit("step-removed", this.data);
    },
    handleChange() {
      this.$emit("step-changed", {...this.model});
    },
  },
};
</script>

<style scoped>
.Step {
  display: flex;
}
</style>
